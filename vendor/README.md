# Vendor: font subset sources

Bundled into `src/subset/engine.cjs` via `npm run subset:build`.  
Runtime package only ships the bundle under `src/subset/` (see `package.json` `build.files`).

## Upstream / Credits

| Project | URL | Role |
| --- | --- | --- |
| web-font | https://github.com/2234839/web-font | Subset pipeline / `font_util` reference |
| fonteditor-core | https://github.com/kekee000/fonteditor-core | Font parse & subset core (vendored) |

Please respect the licenses of the upstream projects.
