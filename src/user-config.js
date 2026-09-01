const fs = require("fs");
const path = require("path");
const { app } = require("electron");

const DEFAULT_CONFIG = {
  openAtLogin: true,
  language: "en",
  appearance: "system",
  accent: "purple",
};

function getConfigPath() {
  return path.join(app.getPath("userData"), "config.json");
}

function readConfig() {
  try {
    const raw = fs.readFileSync(getConfigPath(), "utf8");
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

function writeConfig(partial) {
  const next = { ...readConfig(), ...partial };
  fs.mkdirSync(path.dirname(getConfigPath()), { recursive: true });
  fs.writeFileSync(getConfigPath(), JSON.stringify(next, null, 2));
  return next;
}

function applyAutostart(enabled) {
  const settings = {
    openAtLogin: enabled,
    path: app.getPath("exe"),
  };

  // Linux：Electron 会写入 ~/.config/autostart/*.desktop
  if (process.platform === "linux") {
    settings.args = app.isPackaged ? [] : [path.resolve(__dirname, "..")];
  }

  app.setLoginItemSettings(settings);
  writeConfig({ openAtLogin: enabled });
}

function isAutostartEnabled() {
  const settings = app.getLoginItemSettings();
  return settings.openAtLogin;
}

module.exports = {
  readConfig,
  writeConfig,
  applyAutostart,
  isAutostartEnabled,
};
