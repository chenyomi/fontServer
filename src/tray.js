const path = require("path");
const fs = require("fs");
const { Tray, Menu, nativeImage } = require("electron");
const { applyAutostart, isAutostartEnabled, readConfig } = require("./user-config");

/** @type {Tray | null} */
let tray = null;

const TRAY_I18N = {
  zh: {
    running: "FontServer 运行中",
    stopped: "FontServer 已停止",
    openPanel: "打开控制面板",
    stopService: "停止服务",
    startService: "启动服务",
    openAtLogin: "开机时启动",
    quit: "退出 FontServer",
    quitShort: "退出",
  },
  en: {
    running: "FontServer Running",
    stopped: "FontServer Stopped",
    openPanel: "Open Control Panel",
    stopService: "Stop Service",
    startService: "Start Service",
    openAtLogin: "Open at Login",
    quit: "Quit FontServer",
    quitShort: "Quit",
  },
};

function trayStrings(lang) {
  return TRAY_I18N[lang === "zh" ? "zh" : "en"];
}

function resolveLang(ctx) {
  return ctx.language || readConfig().language || "en";
}

function trayIconPath() {
  if (process.platform === "win32") {
    return path.join(__dirname, "..", "resources", "icon.ico");
  }
  const retina = path.join(__dirname, "..", "resources", "tray-icon@2x.png");
  const normal = path.join(__dirname, "..", "resources", "tray-icon.png");
  if (fs.existsSync(retina)) return retina;
  if (fs.existsSync(normal)) return normal;
  return path.join(__dirname, "..", "resources", "icon.png");
}

function trayIconSize() {
  if (process.platform === "darwin") return 22;
  if (process.platform === "linux") return 24;
  return 16;
}

function buildMenu(ctx) {
  const {
    onOpenPanel,
    onToggleService,
    onQuit,
    serviceRunning = true,
  } = ctx;
  const t = trayStrings(resolveLang(ctx));
  const autostart = isAutostartEnabled();

  return Menu.buildFromTemplate([
    { label: serviceRunning ? t.running : t.stopped, enabled: false },
    {
      label: t.openPanel,
      click: () => {
        if (onOpenPanel) onOpenPanel();
      },
    },
    { type: "separator" },
    {
      label: serviceRunning ? t.stopService : t.startService,
      click: () => {
        if (onToggleService) onToggleService();
      },
    },
    {
      label: t.openAtLogin,
      type: "checkbox",
      checked: autostart,
      click: (item) => {
        applyAutostart(item.checked);
        refreshTrayMenu(ctx);
      },
    },
    { type: "separator" },
    {
      label: process.platform === "darwin" ? t.quit : t.quitShort,
      click: onQuit,
    },
  ]);
}

function refreshTrayMenu(ctx) {
  if (!tray) return;
  const next = { ...ctx, serviceRunning: ctx.serviceRunning !== false };
  const t = trayStrings(resolveLang(next));
  tray.setContextMenu(buildMenu(next));
  tray.setToolTip(next.serviceRunning ? t.running : t.stopped);
}

function createTray(ctx) {
  if (tray) {
    refreshTrayMenu(ctx);
    return tray;
  }

  let image = nativeImage.createFromPath(trayIconPath());
  if (!image.isEmpty() && (process.platform === "darwin" || process.platform === "linux")) {
    const size = trayIconSize();
    image = image.resize({ width: size, height: size, quality: "best" });
  }

  tray = new Tray(image.isEmpty() ? nativeImage.createEmpty() : image);
  refreshTrayMenu(ctx);

  if (process.platform === "darwin" || process.platform === "linux") {
    tray.on("click", () => {
      if (ctx.onOpenPanel) ctx.onOpenPanel();
    });
  }

  return tray;
}

function destroyTray() {
  if (tray) {
    tray.destroy();
    tray = null;
  }
}

function popupTrayMenu() {
  if (tray) {
    tray.popUpContextMenu();
  }
}

module.exports = {
  createTray,
  refreshTrayMenu,
  destroyTray,
  popupTrayMenu,
};
