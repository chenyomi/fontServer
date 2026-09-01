const express = require("express");
const path = require("path");
const fs = require("fs");
const os = require("os");
const { subsetFontFile, matchFontByName, CONTENT_TYPES } = require("./subset");

let serverInstance;
let fontCache = null;
let fontCacheAt = 0;
const FONT_CACHE_TTL_MS = 60_000;

const FONT_EXT = /\.(ttf|otf|ttc|otc|woff|woff2)$/i;
const COLLECTION_EXT = new Set(["ttc", "otc"]);

function isCollectionFont(font) {
  const ext = (font.ext || path.extname(font.path).slice(1) || "").toLowerCase();
  return COLLECTION_EXT.has(ext);
}

function filterFontsForList(fonts, { includeCollections = false } = {}) {
  if (includeCollections) return fonts;
  return fonts.filter((f) => !isCollectionFont(f));
}

/**
 * 递归扫描字体目录
 */
function scanFontsDir(dir, system = true, seen = new Set()) {
  const fonts = [];
  if (!fs.existsSync(dir)) return fonts;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      fonts.push(...scanFontsDir(fullPath, system, seen));
    } else if (entry.isFile() && FONT_EXT.test(entry.name)) {
      if (!seen.has(fullPath)) {
        fonts.push({
          name: path.parse(entry.name).name,
          path: fullPath,
          system,
          ext: path.extname(entry.name).slice(1).toLowerCase(),
        });
        seen.add(fullPath);
      }
    }
  }
  return fonts;
}

/**
 * 获取系统 + 用户字体
 */
function getSystemFonts({ forceRefresh = false } = {}) {
  const now = Date.now();
  if (!forceRefresh && fontCache && now - fontCacheAt < FONT_CACHE_TTL_MS) {
    return fontCache;
  }

  const fonts = [];
  const seen = new Set();
  const platform = process.platform;

  if (platform === "darwin") {
    const systemDirs = ["/System/Library/Fonts", "/Library/Fonts"];
    const userDirs = [path.join(os.homedir(), "Library/Fonts")];
    systemDirs.forEach((d) => fonts.push(...scanFontsDir(d, true, seen)));
    userDirs.forEach((d) => fonts.push(...scanFontsDir(d, false, seen)));
  } else if (platform === "win32") {
    const systemDir = path.join(process.env.WINDIR || "C:\\Windows", "Fonts");
    const userDir = path.join(os.homedir(), "AppData", "Local", "Microsoft", "Windows", "Fonts");
    fonts.push(...scanFontsDir(systemDir, true, seen));
    fonts.push(...scanFontsDir(userDir, false, seen));
  } else {
    const systemDirs = [
      "/usr/share/fonts",
      "/usr/share/fonts/truetype",
      "/usr/share/fonts/opentype",
      "/usr/local/share/fonts",
    ];
    const userDirs = [
      path.join(os.homedir(), ".fonts"),
      path.join(os.homedir(), ".local/share/fonts"),
    ];
    systemDirs.forEach((d) => fonts.push(...scanFontsDir(d, true, seen)));
    userDirs.forEach((d) => fonts.push(...scanFontsDir(d, false, seen)));
  }

  fontCache = fonts;
  fontCacheAt = now;
  return fonts;
}

function cors(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
}

function resolveFontPath(encodedPath) {
  const fontPath = decodeURIComponent(encodedPath);
  if (!path.isAbsolute(fontPath)) return null;

  const fonts = getSystemFonts();
  const match = fonts.find((f) => f.path === fontPath);
  return match ? match.path : null;
}

/**
 * 启动服务
 */
function start(appInstance, port = 3838) {
  const app = express();
  app.use(cors);

  app.get("/health", (req, res) => {
    res.json({
      status: "ok",
      port,
      platform: process.platform,
      version: require("../package.json").version,
    });
  });

  app.get("/test", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "test.html"));
  });

  app.get("/fonts", (req, res) => {
    try {
      const forceRefresh = req.query.refresh === "1" || req.query.refresh === "true";
      const includeCollections =
        req.query.all === "1" ||
        req.query.all === "true" ||
        req.query.collections === "1" ||
        req.query.collections === "true";
      const allFonts = getSystemFonts({ forceRefresh });
      const fonts = filterFontsForList(allFonts, { includeCollections });
      res.json({
        status: 200,
        count: fonts.length,
        total: allFonts.length,
        filtered: !includeCollections,
        cached: !forceRefresh && Date.now() - fontCacheAt < FONT_CACHE_TTL_MS,
        fonts,
      });
    } catch (err) {
      res.status(500).json({ status: 500, error: String(err) });
    }
  });

  app.get("/font", (req, res) => {
    try {
      const encodedPath = req.query.path;
      if (!encodedPath || typeof encodedPath !== "string") {
        res.status(400).json({ status: 400, error: "Missing path query parameter" });
        return;
      }
      const fontPath = resolveFontPath(encodedPath);
      if (!fontPath || !fs.existsSync(fontPath)) {
        res.status(404).json({ status: 404, error: "Font not found" });
        return;
      }
      res.sendFile(fontPath);
    } catch (err) {
      res.status(500).json({ status: 500, error: String(err) });
    }
  });

  /**
   * 按需裁剪本机字体（对齐 web-font）
   * GET /subset?path=...&text=你好&outType=woff2|ttf&encode=base64
   * GET /subset?name=Arial&text=Hello
   */
  app.get("/subset", async (req, res) => {
    const t0 = Date.now();
    try {
      const text = typeof req.query.text === "string" ? req.query.text : "";
      if (!text) {
        res.status(400).json({ status: 400, error: "Missing text query parameter" });
        return;
      }

      const fonts = filterFontsForList(getSystemFonts());
      let fontPath = null;
      let fontMeta = null;

      if (typeof req.query.path === "string" && req.query.path) {
        fontPath = resolveFontPath(req.query.path);
        fontMeta = fonts.find((f) => f.path === fontPath) || null;
        // path 若指向集合字体，仍解析得到路径，交给 subset 返回 415
        if (!fontMeta && fontPath) {
          const all = getSystemFonts().find((f) => f.path === fontPath);
          if (all) fontMeta = all;
        }
      } else if (typeof req.query.name === "string" && req.query.name) {
        fontMeta = matchFontByName(fonts, req.query.name);
        fontPath = fontMeta ? fontMeta.path : null;
      } else {
        res.status(400).json({ status: 400, error: "Missing path or name query parameter" });
        return;
      }

      const tFind = Date.now();
      if (!fontPath || !fs.existsSync(fontPath)) {
        res.status(404).json({ status: 404, error: "Font not found" });
        return;
      }

      const outType = req.query.outType === "ttf" ? "ttf" : "woff2";
      const encode = req.query.encode === "base64" ? "base64" : "";

      const result = await subsetFontFile({ fontPath, text, outType });
      if (!result.ok) {
        if (result.status === 503) {
          res.setHeader("Retry-After", "1");
        }
        res.status(result.status).json({ status: result.status, error: result.error });
        return;
      }

      const timings = {
        ...result.timings,
        find: tFind - t0,
        total: Date.now() - t0,
      };

      res.setHeader("X-Cache", result.cached ? "HIT" : "MISS");
      res.setHeader("X-Timing-Find", String(timings.find));
      res.setHeader("X-Timing-Read", String(timings.read));
      res.setHeader("X-Timing-Subset", String(timings.subset));
      res.setHeader("X-Timing-Total", String(timings.total));
      res.setHeader("Cache-Control", "public, max-age=86400");

      if (encode === "base64") {
        res.json({
          status: 200,
          family: fontMeta ? fontMeta.name : path.parse(fontPath).name,
          format: result.outType,
          path: fontPath,
          size: result.bytes.byteLength,
          cached: result.cached,
          data: result.bytes.toString("base64"),
        });
        return;
      }

      res.setHeader("Content-Type", CONTENT_TYPES[result.outType] || "application/octet-stream");
      res.setHeader("Content-Length", String(result.bytes.byteLength));
      res.end(result.bytes);
    } catch (err) {
      res.status(500).json({ status: 500, error: String(err && err.message ? err.message : err) });
    }
  });

  app.get("/autostart", (req, res) => {
    const settings = appInstance.getLoginItemSettings();
    res.json({ enabled: settings.openAtLogin });
  });

  app.post("/autostart/:enable", (req, res) => {
    const enable = req.params.enable === "true";
    appInstance.setLoginItemSettings({ openAtLogin: enable, path: process.execPath });
    res.json({ success: true, enabled: enable });
  });

  app.post("/shutdown", (req, res) => {
    res.json({ success: true });
    console.log("Shutdown requested. Closing server...");
    setTimeout(() => {
      if (serverInstance) {
        serverInstance.close(() => {
          console.log("HTTP server closed.");
          appInstance.quit();
        });
      } else {
        appInstance.quit();
      }
    }, 100);
  });

  serverInstance = app.listen(port, "127.0.0.1", () => {
    console.log(`Font server listening on http://127.0.0.1:${port}`);
  });

  return serverInstance;
}

function stop() {
  return new Promise((resolve) => {
    if (!serverInstance) {
      resolve();
      return;
    }
    serverInstance.close(() => {
      serverInstance = null;
      resolve();
    });
  });
}

module.exports = { start, stop, getSystemFonts };
