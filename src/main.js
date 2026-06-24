const { app } = require("electron");
const path = require("path");
const fs = require("fs");
const { clearMacQuarantine } = require("./mac-quarantine");

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
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
  const PORT = Number(process.env.FONT_SERVER_PORT) || 3838;

  app.whenReady().then(() => {
    if (process.platform === "darwin") {
      app.dock.hide();
    }

    server.start(app, PORT);

    app.setLoginItemSettings({
      openAtLogin: true,
      path: app.getPath("exe"),
    });

    console.log(`FontServer v${require("../package.json").version} started on port ${PORT}`);
  });

  app.on("window-all-closed", (event) => {
    event.preventDefault();
  });

  app.on("before-quit", async () => {
    await server.stop();
  });

  app.on("second-instance", () => {
    console.log("FontServer is already running.");
  });
}
