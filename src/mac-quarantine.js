const { execFileSync } = require("child_process");
const path = require("path");
const { app } = require("electron");

/**
 * 清除 macOS 下载隔离属性，避免未签名应用提示「已损坏」。
 * DMG 拖拽安装无安装脚本，因此在应用启动时自动执行。
 */
function clearMacQuarantine() {
  if (process.platform !== "darwin" || !app.isPackaged) return;

  try {
    const bundlePath = path.resolve(process.execPath, "../../..");
    if (!bundlePath.endsWith(".app")) return;
    execFileSync("/usr/bin/xattr", ["-cr", bundlePath], { stdio: "ignore" });
  } catch {
    // 无权限或已无隔离属性时忽略
  }
}

module.exports = { clearMacQuarantine };
