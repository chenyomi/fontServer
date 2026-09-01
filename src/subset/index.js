const fs = require("fs");
const path = require("path");
const { fontSubset } = require("./engine.cjs");

const CONTENT_TYPES = {
  ttf: "font/ttf",
  woff2: "font/woff2",
};

const MAX_CONCURRENCY = Number(process.env.SUBSET_CONCURRENCY) || 4;
const QUEUE_TIMEOUT_MS = Number(process.env.SUBSET_QUEUE_TIMEOUT_MS) || 10_000;
const CACHE_MAX_ENTRIES = Number(process.env.SUBSET_CACHE_MAX) || 64;
const BUFFER_CACHE_MAX = Number(process.env.FONT_BUFFER_CACHE_MAX) || 16;

let activeCount = 0;
const waitQueue = [];

/** @type {Map<string, { bytes: Buffer, byteLength: number }>} */
const subsetCache = new Map();
/** @type {Map<string, ArrayBuffer>} */
const bufferCache = new Map();

function lruGet(map, key) {
  if (!map.has(key)) return undefined;
  const value = map.get(key);
  map.delete(key);
  map.set(key, value);
  return value;
}

function lruSet(map, key, value, max) {
  if (map.has(key)) map.delete(key);
  map.set(key, value);
  while (map.size > max) {
    const oldest = map.keys().next().value;
    map.delete(oldest);
  }
}

function waitForSlot(timeoutMs) {
  return new Promise((resolve) => {
    const item = { resolve: () => resolve(true) };
    const timer = setTimeout(() => {
      const idx = waitQueue.indexOf(item);
      if (idx !== -1) waitQueue.splice(idx, 1);
      resolve(false);
    }, timeoutMs);
    item.resolve = () => {
      clearTimeout(timer);
      resolve(true);
    };
    waitQueue.push(item);
  });
}

function releaseSlot() {
  const next = waitQueue.shift();
  if (next) next.resolve();
}

async function withConcurrencyGate(task) {
  if (activeCount >= MAX_CONCURRENCY) {
    const ok = await waitForSlot(QUEUE_TIMEOUT_MS);
    if (!ok) return null;
  }
  activeCount += 1;
  try {
    return await task();
  } finally {
    activeCount -= 1;
    releaseSlot();
  }
}

/** 去重并稳定排序字符，作缓存 key */
function normalizeText(text) {
  const cps = [];
  for (let i = 0; i < text.length; i++) {
    const cp = text.codePointAt(i);
    cps.push(cp);
    if (cp > 0xffff) i += 1;
  }
  const unique = [...new Set(cps)].sort((a, b) => a - b);
  return String.fromCodePoint(...unique);
}

function detectSourceType(fontPath, buffer) {
  const ext = path.extname(fontPath).slice(1).toLowerCase();
  if (ext === "otf") return "otf";
  if (ext === "ttf" || ext === "woff" || ext === "woff2") return "ttf";
  if (ext === "ttc" || ext === "otc") return "collection";

  if (buffer && buffer.byteLength >= 4) {
    const tag = Buffer.from(buffer, 0, 4).toString("ascii");
    if (tag === "OTTO") return "otf";
    if (tag === "ttcf") return "collection";
    if (tag === "\x00\x01\x00\x00" || tag === "true") return "ttf";
  }
  return "ttf";
}

function readFontBuffer(fontPath) {
  const cached = lruGet(bufferCache, fontPath);
  if (cached) return cached;
  const buf = fs.readFileSync(fontPath);
  const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  lruSet(bufferCache, fontPath, ab, BUFFER_CACHE_MAX);
  return ab;
}

/**
 * 按字体名模糊匹配：精确 > 忽略扩展名精确 > 前缀 > 包含
 * @param {Array<{ name: string, path: string }>} fonts
 * @param {string} query
 */
function matchFontByName(fonts, query) {
  if (!query) return null;
  const q = query.trim().toLowerCase();
  const qBase = q.replace(/\.(ttf|otf|ttc|otc|woff2?)$/i, "");

  const exact = fonts.find((f) => f.name.toLowerCase() === q || f.name.toLowerCase() === qBase);
  if (exact) return exact;

  const byFile = fonts.find((f) => path.basename(f.path).toLowerCase() === q);
  if (byFile) return byFile;

  const prefix = fonts.find(
    (f) => f.name.toLowerCase().startsWith(qBase) || path.basename(f.path).toLowerCase().startsWith(qBase)
  );
  if (prefix) return prefix;

  return (
    fonts.find(
      (f) => f.name.toLowerCase().includes(qBase) || path.basename(f.path).toLowerCase().includes(qBase)
    ) || null
  );
}

/**
 * @param {{ fontPath: string, text: string, outType?: string }} opts
 * @returns {Promise<{ ok: true, bytes: Buffer, outType: string, cached: boolean, timings: object } | { ok: false, status: number, error: string }>}
 */
async function subsetFontFile({ fontPath, text, outType = "woff2" }) {
  const t0 = Date.now();
  const normalized = normalizeText(text);
  if (!normalized) {
    return { ok: false, status: 400, error: "text is empty after normalization" };
  }

  const type = outType === "ttf" ? "ttf" : "woff2";
  const cacheKey = `${fontPath}|${type}|${normalized}`;
  const hit = lruGet(subsetCache, cacheKey);
  if (hit) {
    return {
      ok: true,
      bytes: hit.bytes,
      outType: type,
      cached: true,
      timings: { find: 0, read: 0, subset: 0, total: Date.now() - t0 },
    };
  }

  let buffer;
  try {
    buffer = readFontBuffer(fontPath);
  } catch (err) {
    return { ok: false, status: 500, error: `Font read error: ${err.message || err}` };
  }
  const t1 = Date.now();

  const sourceType = detectSourceType(fontPath, buffer);
  if (sourceType === "collection") {
    return {
      ok: false,
      status: 415,
      error: "TrueType/OpenType Collection (.ttc/.otc) is not supported; use a single .ttf/.otf file",
    };
  }

  const result = await withConcurrencyGate(() =>
    Promise.resolve().then(() =>
      fontSubset(buffer, normalized, {
        sourceType,
        outType: type,
      })
    )
  );

  if (result === null) {
    return { ok: false, status: 503, error: "Server busy, please retry" };
  }

  const t2 = Date.now();
  const bytes = Buffer.from(result.buffer, result.byteOffset, result.byteLength);
  lruSet(subsetCache, cacheKey, { bytes, byteLength: bytes.byteLength }, CACHE_MAX_ENTRIES);

  return {
    ok: true,
    bytes,
    outType: type,
    cached: false,
    timings: {
      find: 0,
      read: t1 - t0,
      subset: t2 - t1,
      total: t2 - t0,
    },
  };
}

module.exports = {
  CONTENT_TYPES,
  subsetFontFile,
  matchFontByName,
  normalizeText,
  detectSourceType,
};
