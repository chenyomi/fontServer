const path = require("path");
const { BrowserWindow, shell } = require("electron");
const { readConfig } = require("./user-config");
const { panelBackground } = require("./theme");

/** @type {BrowserWindow | null} */
let panelWindow = null;

function panelBackgroundColor() {
  const config = readConfig();
  return panelBackground(config.appearance, config.accent);
}

const PANEL_WIDTH = 360;
const PANEL_HEIGHT = 680;

function applyPanelSize(win) {
  if (!win || win.isDestroyed()) return;
  win.setSize(PANEL_WIDTH, PANEL_HEIGHT);
  win.setMinimumSize(PANEL_WIDTH, PANEL_HEIGHT);
  win.setMaximumSize(PANEL_WIDTH, PANEL_HEIGHT);
}

function createPanelWindow({ onClosed }) {
  if (panelWindow && !panelWindow.isDestroyed()) {
    applyPanelSize(panelWindow);
    panelWindow.show();
    panelWindow.focus();
    return panelWindow;
  }

  panelWindow = new BrowserWindow({
    width: PANEL_WIDTH,
    height: PANEL_HEIGHT,
    minWidth: PANEL_WIDTH,
    minHeight: PANEL_HEIGHT,
    maxWidth: PANEL_WIDTH,
    maxHeight: PANEL_HEIGHT,
    title: "FontServer",
    autoHideMenuBar: true,
    resizable: false,
    show: false,
    titleBarStyle: process.platform === "darwin" ? "hiddenInset" : "default",
    vibrancy: process.platform === "darwin" ? "under-window" : undefined,
    visualEffectState: process.platform === "darwin" ? "active" : undefined,
    backgroundColor: panelBackgroundColor(),
    icon: path.join(__dirname, "..", "resources", process.platform === "win32" ? "icon.ico" : "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload", "panel-preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
    },
  });

  panelWindow.once("ready-to-show", () => {
    if (panelWindow && !panelWindow.isDestroyed()) {
      panelWindow.show();
    }
  });

  panelWindow.on("close", (event) => {
    if (panelWindow && !panelWindow.isDestroyed()) {
      event.preventDefault();
      panelWindow.hide();
      if (onClosed) onClosed();
    }
  });

  panelWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  panelWindow.loadFile(path.join(__dirname, "..", "public", "panel.html"));
  return panelWindow;
}

function showPanelWindow() {
  if (panelWindow && !panelWindow.isDestroyed()) {
    applyPanelSize(panelWindow);
    panelWindow.show();
    panelWindow.focus();
  }
}

function getPanelWindow() {
  return panelWindow && !panelWindow.isDestroyed() ? panelWindow : null;
}

function destroyPanelWindow() {
  if (panelWindow && !panelWindow.isDestroyed()) {
    panelWindow.removeAllListeners("close");
    panelWindow.close();
    panelWindow = null;
  }
}

module.exports = {
  createPanelWindow,
  showPanelWindow,
  getPanelWindow,
  destroyPanelWindow,
};
