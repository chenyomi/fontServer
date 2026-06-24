# FontServer

本地字体 HTTP 服务（Electron 后台静默运行），供设计工具、网页等读取本机已安装字体。

## 下载安装

从 [Releases](https://github.com/chenyomi/fontServer/releases) 下载对应版本：

| 系统 | 文件 |
| --- | --- |
| Apple 芯片 Mac | `font-service-*-arm64-mac.dmg` |
| Intel Mac | `font-service-*-x64-mac.dmg` |
| Windows 64 位 | `font-service-setup-*.exe` |

安装后默认在 `http://127.0.0.1:3838` 提供 API，开机自启。

### macOS「已损坏，无法打开」

```bash
xattr -cr "/Applications/FontServer.app"
```

或右键 → **打开** → **打开**（仅首次）。

## API

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/health` | 健康检查 |
| GET | `/fonts` | 字体列表（`?refresh=1` 强制刷新缓存） |
| GET | `/font?path={encodeURIComponent(绝对路径)}` | 下载字体文件 |
| GET | `/autostart` | 查询开机自启状态 |
| POST | `/autostart/true` | 开启开机自启 |
| POST | `/autostart/false` | 关闭开机自启 |
| POST | `/shutdown` | 关闭服务并退出应用 |

环境变量 `FONT_SERVER_PORT` 可修改端口（默认 `3838`）。

## 开发

```bash
npm install
npm run dev
```

## 本地打包

```bash
npm run icons      # 生成 resources/icon.*
npm run build:mac  # macOS dmg + zip (arm64 + x64)
npm run build:win  # Windows 安装包
```

## 自动发布（GitHub Actions）

与 [electron-erp](https://github.com/chenyomi/electron-erp) 相同流程：

1. 修改 `package.json` 中的 `version` 并 push 到 `main`
2. **Auto Tag** 工作流自动打 tag（如 `v1.1.0`）并触发 **Release** 打包
3. Mac / Windows 安装包自动上传到 GitHub Releases

手动重新打包：**Actions → Release → Run workflow**，填写 tag（如 `v1.1.0`）。
