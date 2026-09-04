const { app, ipcMain, nativeTheme } = require("electron");
const path = require("path");
const fs = require("fs");
const { clearMacQuarantine } = require("./mac-quarantine");
const { readConfig, writeConfig, applyAutostart, isAutostartEnabled } = require("./user-config");
const { ACCENT_IDS, getAccent, applyAppearance, isDarkMode, panelBackground } = require("./theme");
const { createTray, refreshTrayMenu, destroyTray } = require("./tray");
const { setAppMenu, configureAboutPanel, showAbout } = require("./app-menu");
const {
  createPanelWindow,
  showPanelWindow,
  getPanelWindow,
  destroyPanelWindow,
} = require("./panel-window");

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
app.setName("FontServer");
clearMacQuarantine();

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  const serverPath = path.join(__dirname, "server.js");
  if (!fs.existsSync(serverPath)) {
    console.error("server.js 文件不存在！");
    app.quit();
  }

  const server = require(serverPath);
  const pkg = require("../package.json");
  const PORT = Number(process.env.FONT_SERVER_PORT) || 43838;

  /** @type {{ onOpenPanel: () => void; onToggleService: () => void; onQuit: () => void }} */
  let trayCtx = {};

  function getAppState() {
    const config = readConfig();
    const accentTheme = getAccent(config.accent);
    const darkMode = isDarkMode(config.appearance);

    return {
      running: server.isRunning(),
      version: pkg.version,
      port: PORT,
      platform: process.platform,
      autostart: isAutostartEnabled(),
      language: config.language,
      appearance: config.appearance,
      accent: config.accent,
      accentTheme,
      darkMode,
    };
  }

  async function testConnection() {
    const state = getAppState();
    const checks = [];

    if (!server.isRunning()) {
      return {
        ok: false,
        code: "service_stopped",
        port: PORT,
        checks: [{ id: "service", ok: false }],
      };
    }

    const started = Date.now();
    let healthData = null;

    try {
      const healthStarted = Date.now();
      const res = await fetch(`http://127.0.0.1:${PORT}/health`, { signal: AbortSignal.timeout(3000) });
      healthData = await res.json();
      const healthMs = Date.now() - healthStarted;
      const healthOk = res.ok && healthData.status === "ok";
      checks.push({
        id: "health",
        ok: healthOk,
        ms: healthMs,
        version: healthData.version,
      });

      if (healthOk) {
        try {
          const fontsStarted = Date.now();
          const fontsRes = await fetch(`http://127.0.0.1:${PORT}/fonts`, { signal: AbortSignal.timeout(5000) });
          const fontsData = await fontsRes.json();
          const fontsMs = Date.now() - fontsStarted;
          const fontsOk = fontsRes.ok && fontsData.status === 200 && typeof fontsData.count === "number";
          checks.push({
            id: "fonts",
            ok: fontsOk,
            ms: fontsMs,
            count: fontsData.count,
          });
        } catch {
          checks.push({ id: "fonts", ok: false });
        }
      }
    } catch {
      checks.push({ id: "health", ok: false });
    }

    checks.push({ id: "autostart", ok: true, enabled: state.autostart });

    const critical = checks.filter((c) => c.id === "health" || c.id === "fonts");
    const ok = critical.length > 0 && critical.every((c) => c.ok);

    return {
      ok,
      code: ok ? "ok" : checks.some((c) => c.id === "health" && c.ok) ? "partial" : "unreachable",
      port: PORT,
      ms: Date.now() - started,
      platform: healthData?.platform || process.platform,
      version: healthData?.version || state.version,
      checks,
    };
  }

  function syncUi() {
    const state = getAppState();
    refreshTrayMenu({ ...trayCtx, serviceRunning: state.running, language: state.language });
    configureAboutPanel(state.language);
    setAppMenu(state.language);

    const panel = getPanelWindow();
    if (panel) {
      panel.webContents.send("fontserver:state-changed", state);
      panel.setBackgroundColor(panelBackground(state.appearance, state.accent));
    }
  }

  async function toggleService() {
    if (server.isRunning()) {
      await server.stop();
    } else {
      server.start(app, PORT);
    }
    syncUi();
  }

  async function quitApp() {
    destroyPanelWindow();
    destroyTray();
    await server.stop();
    app.quit();
  }

  trayCtx = {
    onOpenPanel: () => showPanelWindow(),
    onToggleService: toggleService,
    onQuit: quitApp,
  };

  ipcMain.handle("fontserver:get-state", () => getAppState());

  ipcMain.handle("fontserver:set-service", async (_event, enabled) => {
    if (enabled && !server.isRunning()) {
      server.start(app, PORT);
    } else if (!enabled && server.isRunning()) {
      await server.stop();
    }
    syncUi();
    return getAppState();
  });

  ipcMain.handle("fontserver:set-autostart", (_event, enabled) => {
    applyAutostart(!!enabled);
    syncUi();
    return getAppState();
  });

  ipcMain.handle("fontserver:show-about", () => {
    const lang = readConfig().language || "en";
    showAbout(lang);
  });

  ipcMain.handle("fontserver:test-connection", () => testConnection());

  ipcMain.handle("fontserver:set-preferences", (_event, prefs) => {
    const patch = {};
    if (prefs.language === "zh" || prefs.language === "en") patch.language = prefs.language;
    if (prefs.appearance === "system" || prefs.appearance === "light" || prefs.appearance === "dark") {
      patch.appearance = prefs.appearance;
    }
    if (ACCENT_IDS.includes(prefs.accent)) patch.accent = prefs.accent;

    const config = writeConfig(patch);
    if (patch.appearance) applyAppearance(patch.appearance);
    syncUi();
    return getAppState();
  });

  nativeTheme.on("updated", syncUi);

  app.whenReady().then(() => {
    const config = readConfig();
    applyAppearance(config.appearance);
    applyAutostart(config.openAtLogin);

    configureAboutPanel(config.language);

    server.start(app, PORT);

    createTray({ ...trayCtx, serviceRunning: server.isRunning(), language: config.language });
    setAppMenu(config.language);

    createPanelWindow({
      onClosed: () => {
        if (process.platform === "darwin") {
          app.dock.hide();
        }
      },
    });

    if (process.platform === "darwin") {
      app.dock.show();
      app.dock.setIcon(path.join(__dirname, "..", "resources", "icon.png"));
    }

    console.log(`FontServer v${pkg.version} started on port ${PORT}`);
  });

  app.on("window-all-closed", (event) => {
    event.preventDefault();
  });

  app.on("before-quit", async () => {
    destroyPanelWindow();
    destroyTray();
    await server.stop();
  });

  app.on("second-instance", () => {
    showPanelWindow();
    if (process.platform === "darwin") {
      app.dock.show();
    }
  });
}
