---
name: fontserver-local
description: >-
  Use local FontServer (http://127.0.0.1:43838) to list system fonts and
  on-demand subset large Chinese/local fonts into tiny woff2/ttf for web,
  H5, posters, Leafer/canvas, and design tools. Use when the user mentions
  FontServer, local fonts, /subset, 本地字体, 字体裁剪, 按需字体, or wants
  @font-face / FontFace from machine-installed fonts without shipping full
  TTF/OTF.
---

# FontServer Local Font Skill

本机 FontServer 提供系统字体列表与按需裁剪。默认地址：`http://127.0.0.1:43838`。

先确认服务可用：

```bash
curl -s http://127.0.0.1:43838/health
```

浏览器自测页：`http://127.0.0.1:43838/test`

## 核心原则

1. **不要下发完整大字体**（`/font` 仅调试用）。页面/画布只用 `/subset`。
2. **默认二进制 woff2**，直接给 `@font-face` / `FontFace`。不要默认 base64（大约多 33%）。
3. `text` 只放实际出现的字符；服务端会去重。动态文案需重新请求或合并字符集。
4. 仅支持单文件 `.ttf` / `.otf`。`.ttc` / `.otc` 裁剪会 415；`GET /fonts` 默认已排除它们（`?all=1` 可看全部）。
5. 字体名用 `/fonts` 列表里的 `name`，或绝对 `path`（须在扫描结果内；子集匹配默认不含集合字体）。

## API

| 方法 | 路径 | 用途 |
| --- | --- | --- |
| GET | `/health` | 探活 |
| GET | `/fonts` | 列本机字体（默认无 ttc/otc；`?all=1` 含全部；`?refresh=1` 刷新） |
| GET | `/subset` | 按文字裁剪子集 |
| GET | `/font?path=` | 完整原字体（慎用） |
| GET | `/test` | 可视化测试页 |

### `/subset` 参数

| 参数 | 说明 |
| --- | --- |
| `path` | 绝对路径（与 `/fonts` 返回一致） |
| `name` | 字体名模糊匹配（精确 > 去扩展名精确 > 前缀 > 包含）；与 `path` 二选一 |
| `text` | 必填，要保留的字符 |
| `outType` | `woff2`（默认）或 `ttf` |
| `encode` | 省略=二进制；`base64`=JSON |

响应头：`X-Cache`、`X-Timing-Find/Read/Subset/Total`。

## 推荐用法

### CSS（首选）

```html
<style>
@font-face {
  font-family: "LocalDisplay";
  src: url("http://127.0.0.1:43838/subset?name=方正有猫在_GBK&text=静心茶舍品牌&outType=woff2") format("woff2");
  font-display: swap;
}
.hero {
  font-family: "LocalDisplay", "PingFang SC", "Noto Sans CJK SC", sans-serif;
}
</style>
```

`text` 必须覆盖该 `font-family` 下所有可见汉字/标点/英文；漏字会缺字形。

### JS / 画布 / Leafer

二进制（推荐）：

```js
const text = "你好世界";
const name = "方正有猫在_GBK";
const url = `http://127.0.0.1:43838/subset?name=${encodeURIComponent(name)}&text=${encodeURIComponent(text)}&outType=woff2`;
const face = new FontFace("LocalDisplay", `url(${url})`);
await face.load();
document.fonts.add(face);
```

仅当环境无法用 URL 加载字体时再用 base64：

```js
const res = await fetch(
  `http://127.0.0.1:43838/subset?name=${encodeURIComponent(name)}&text=${encodeURIComponent(text)}&encode=base64`
);
const { format, data } = await res.json();
const face = new FontFace("LocalDisplay", `url(data:font/${format};base64,${data})`);
await face.load();
document.fonts.add(face);
```

### 先查字体再裁剪

```bash
curl -s http://127.0.0.1:43838/fonts | head
curl -s -o /tmp/f.woff2 -D - \
  "http://127.0.0.1:43838/subset?name=Arial&text=Hello你好&outType=woff2"
```

`/fonts` 项大致为：`{ name, path, system, ext }`。默认已是可裁剪格式（ttf/otf/woff…）。

## Agent 工作流

生成依赖本机特殊字体的页面或画布时：

1. `GET /health`；失败则提示用户启动 FontServer。
2. 需要时 `GET /fonts` 确认字体名（模糊匹配可用，但先核对更稳）。
3. 收集该字体实际渲染字符，写入 `text`。
4. 用 `/subset?...&outType=woff2` 写 `@font-face` 或 `FontFace`。
5. 配系统 fallback（见下）。不要把完整 TTF 打进仓库或静态资源。

## Fallback

```css
/* 无衬线 */ "LocalDisplay", "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif;
/* 衬线 */ "LocalDisplay", "Songti SC", "SimSun", "Noto Serif CJK SC", serif;
```

## 限制与排错

| 现象 | 处理 |
| --- | --- |
| 连接失败 | 确认 FontServer 已启动；端口默认 43838，可被 `FONT_SERVER_PORT` 改掉 |
| 404 Font not found | 检查 `name`/`path`；`path` 必须来自 `/fonts` |
| 415 Collection | 换 `.ttf`/`.otf`，不要用 `.ttc`/`.otc` |
| 缺字 / tofu | `text` 未包含该字符；把新字符并入后重请求 |
| CORS | 服务已允许本机跨域；确保请求打到 `127.0.0.1` |

## 与云端 web-font 的区别

| | FontServer（本 skill） | web-font 云服务 |
| --- | --- | --- |
| 字体来源 | 本机已安装字体 | 远端字库 / 上传 |
| 基址 | `http://127.0.0.1:43838` | 如 `https://webfont.shenzilong.cn` |
| 适合 | 设计工具、本地预览、私有字体 | 公网 H5 / 官网 |

本地私有字体、设计稿预览优先用本 skill。
