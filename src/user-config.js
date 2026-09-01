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
  app.setLoginItemSettings({
    openAtLogin: enabled,
    path: app.getPath("exe"),
  });
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
