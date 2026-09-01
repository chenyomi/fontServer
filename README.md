# FontServer

本地字体 HTTP 服务（Electron 后台静默运行）：列出本机字体，并按文字裁剪成小体积 woff2/ttf，供设计工具、网页、画布使用。

默认地址：`http://127.0.0.1:43838`  
测试页：`http://127.0.0.1:43838/test`

## 下载安装

从 [Releases](https://github.com/chenyomi/fontServer/releases) 下载对应版本：

| 系统 | 文件 | 说明 |
| --- | --- | --- |
| Apple 芯片 Mac | `font-service-*-arm64-mac.pkg` | **推荐**，安装时自动去隔离 |
| Intel Mac | `font-service-*-x64-mac.pkg` | **推荐**，安装时自动去隔离 |
| Mac 拖拽安装 | `font-service-*-mac.dmg` / `.zip` | 首次启动自动去隔离 |
| Windows 64 位 | `font-service-setup-*.exe` | |

安装后默认在 `http://127.0.0.1:43838` 提供 API，开机自启。**打开应用会显示控制面板**（运行状态、开机自启、停止服务）；关闭窗口后仍在后台运行，可从菜单栏托盘再次打开。

开发者自测裁剪：浏览器打开 `http://127.0.0.1:43838/test`（不面向普通用户展示）。

### macOS「已损坏，无法打开」

- **PKG**：安装完成后会自动 `xattr -cr`
- **DMG**：首次启动会尝试清隔离；若仍不行，右键 → **打开**
- 长期方案：Apple 开发者证书签名（参见 ERP 项目 README）

## 快速开始

```bash
curl -s http://127.0.0.1:43838/health
open http://127.0.0.1:43838/test   # 可视化：选字体、输入即预览
```

CSS 直链子集（推荐，二进制，不要默认 base64）：

```css
@font-face {
  font-family: "MyFont";
  src: url("http://127.0.0.1:43838/subset?name=方正有猫在_GBK&text=你好世界设计&outType=woff2") format("woff2");
}
.title { font-family: "MyFont", "PingFang SC", sans-serif; }
```

## API

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/health` | 健康检查 |
| GET | `/test` | 浏览器测试页（输入自动预览） |
| GET | `/fonts` | 字体列表（默认排除 `.ttc`/`.otc`；`?all=1` 含全部；`?refresh=1` 强制刷新） |
| GET | `/font?path=` | 下载完整字体（大文件，慎用） |
| GET | `/subset` | **按需裁剪**，见下 |
| GET | `/autostart` | 查询开机自启 |
| POST | `/autostart/true` \| `/false` | 开/关开机自启 |
| POST | `/shutdown` | 退出应用 |

### `GET /subset`

按 `text` 生成本机字体子集。裁剪引擎来自 [web-font](https://github.com/2234839/web-font)。

| 参数 | 说明 |
| --- | --- |
| `path` | 本机绝对路径（必须出现在 `/fonts` 结果中） |
| `name` | 字体名模糊匹配；与 `path` 二选一 |
| `text` | 必填，要保留的字符（服务端去重） |
| `outType` | `woff2`（默认）或 `ttf` |
| `encode` | 省略 → 字体二进制；`base64` → JSON |

```bash
# 二进制
curl -s -o subset.woff2 \
  "http://127.0.0.1:43838/subset?name=Arial&text=Hello你好&outType=woff2"

# JSON + base64（画布等无法用 URL 时）
curl -s "http://127.0.0.1:43838/subset?name=Arial&text=Hello&encode=base64"
```

```json
{ "family": "Arial", "format": "woff2", "size": 3776, "data": "d09GMgAB..." }
```

说明：

- `.ttc` / `.otc` 暂不支持裁剪（HTTP 415）；`/fonts` 默认已过滤，需要完整列表用 `?all=1`
- 响应头：`X-Cache`、`X-Timing-Find` / `Read` / `Subset` / `Total`
- **HTTPS 页面**：已返回 `Access-Control-Allow-Private-Network: true`（Chrome 私有网络访问）。仍失败时确认 FontServer 已启动，或在该站点允许「不安全内容」
- 环境变量：`SUBSET_CONCURRENCY`（默认 4）、`SUBSET_CACHE_MAX`（默认 64）

## Cursor Skill

仓库内 skill：[`skills/fontserver-local/SKILL.md`](skills/fontserver-local/SKILL.md)

教 AI 如何用本机 FontServer 做中文/本地字体按需加载（`@font-face`、FontFace、Leafer 等）。

**装到本机（推荐，全项目可用）：**

```bash
mkdir -p ~/.cursor/skills/fontserver-local
cp skills/fontserver-local/SKILL.md ~/.cursor/skills/fontserver-local/SKILL.md
```

本仓库也已放在 `.cursor/skills/fontserver-local/`，在本项目打开 Cursor 即可发现。

触发词示例：FontServer、本地字体、字体裁剪、`/subset`、按需 woff2。

## 开发

```bash
npm install
npm run dev          # 启动 Electron 服务
npm run subset:build # 改 vendor/web-font-subset 后重建裁剪引擎
```

## 本地打包

```bash
npm run icons
npm run build:mac   # dmg + zip + pkg（arm64 / x64）
npm run build:win
```

## 自动发布（GitHub Actions）

与 [electron-erp](https://github.com/chenyomi/electron-erp) 相同：

1. 修改 `package.json` 的 `version` 并 push `main`
2. Auto Tag 打 `v*` 并触发 Release 打包
3. 安装包上传到 GitHub Releases

手动重打：**Actions → Release → Run workflow**，填写已有 tag。
