const path = require("path");
const fs = require("fs");
const { Tray, Menu, nativeImage } = require("electron");
const { applyAutostart, isAutostartEnabled } = require("./user-config");

/** @type {Tray | null} */
let tray = null;

function trayIconPath() {
  if (process.platform === "win32") {
    return path.join(__dirname, "..", "resources", "icon.ico");
  }
  // macOS / Linux：白底黑字托盘图标
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

function buildMenu({ onOpenPanel, onToggleService, onQuit, serviceRunning = true }) {
  const autostart = isAutostartEnabled();
  const statusLabel = serviceRunning ? "FontServer 运行中" : "FontServer 已停止";

  return Menu.buildFromTemplate([
    { label: statusLabel, enabled: false },
    {
      label: "打开控制面板",
      click: () => {
        if (onOpenPanel) onOpenPanel();
      },
    },
    { type: "separator" },
    {
      label: serviceRunning ? "停止服务" : "启动服务",
      click: () => {
        if (onToggleService) onToggleService();
      },
    },
    {
      label: "开机时启动",
      type: "checkbox",
      checked: autostart,
      click: (item) => {
        applyAutostart(item.checked);
        refreshTrayMenu({ onOpenPanel, onToggleService, onQuit, serviceRunning });
      },
    },
    { type: "separator" },
    {
      label: process.platform === "darwin" ? "退出 FontServer" : "退出",
      click: onQuit,
    },
  ]);
}

function refreshTrayMenu(ctx) {
  if (!tray) return;
  const running = ctx.serviceRunning !== false;
  tray.setContextMenu(buildMenu({ ...ctx, serviceRunning: running }));
  tray.setToolTip(running ? "FontServer 运行中" : "FontServer 已停止");
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

  // macOS / Linux：左键打开面板；Windows 用右键菜单
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
