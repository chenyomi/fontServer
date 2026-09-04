const path = require("path");
const { Menu, app, dialog, shell } = require("electron");
const { readConfig } = require("./user-config");

const pkg = require("../package.json");
const AUTHOR = pkg.author ? pkg.author.split("<")[0].trim() : "chenyomi";
const WEBSITE = "https://www.scipixa.com";
const WEBSITE_LABEL = "www.scipixa.com";

const ABOUT_I18N = {
  zh: {
    credits: `本地字体 HTTP 服务，读取本机已安装字体，并按文字按需裁剪为 woff2/ttf。

专为 Scipixa（${WEBSITE_LABEL}）及设计工具提供系统字体访问能力，无需打包完整字体文件。

作者：${AUTHOR}

裁剪能力参考：web-font、fonteditor-core`,
    versionLabel: "版本",
    dialogTitle: "关于 FontServer",
    btnOk: "好的",
    btnWebsite: "访问官网",
    menuAbout: "关于 FontServer",
    menuWebsite: "访问官网 " + WEBSITE_LABEL,
    menuQuit: "退出 FontServer",
    menuHelp: "帮助",
    menuEdit: "编辑",
    menuFile: "文件",
    menuHide: "隐藏 FontServer",
    menuHideOthers: "隐藏其他",
    menuShowAll: "显示全部",
  },
  en: {
    credits: `Local font HTTP service. Reads installed system fonts and subsets them to woff2/ttf on demand.

Built for Scipixa (${WEBSITE_LABEL}) and design tools — access system fonts without shipping full font files.

Author: ${AUTHOR}

Subset engine based on web-font and fonteditor-core`,
    versionLabel: "Version",
    dialogTitle: "About FontServer",
    btnOk: "OK",
    btnWebsite: "Visit Website",
    menuAbout: "About FontServer",
    menuWebsite: "Visit " + WEBSITE_LABEL,
    menuQuit: "Quit FontServer",
    menuHelp: "Help",
    menuEdit: "Edit",
    menuFile: "File",
    menuHide: "Hide FontServer",
    menuHideOthers: "Hide Others",
    menuShowAll: "Show All",
  },
};

function aboutStrings(lang) {
  return ABOUT_I18N[lang === "zh" ? "zh" : "en"];
}

function configureAboutPanel(lang) {
  const locale = lang || readConfig().language || "en";
  const text = aboutStrings(locale);

  if (process.platform === "darwin") {
    app.setAboutPanelOptions({
      applicationName: "FontServer",
      applicationVersion: pkg.version,
      copyright: `Copyright © ${AUTHOR} · ${WEBSITE_LABEL}`,
      credits: text.credits,
      iconPath: path.join(__dirname, "..", "resources", "icon.png"),
    });
  }
}

function showAboutDialog(locale, text) {
  const versionLine = `${text.versionLabel} ${pkg.version}`;
  return dialog
    .showMessageBox({
      type: "info",
      title: text.dialogTitle,
      message: `FontServer ${pkg.version}`,
      detail: `${versionLine}\n\n${text.credits}\n\nCopyright © ${AUTHOR} · ${WEBSITE_LABEL}`,
      icon: path.join(__dirname, "..", "resources", "icon.png"),
      buttons: [text.btnOk, text.btnWebsite],
      defaultId: 0,
      cancelId: 0,
    })
    .then((result) => {
      if (result.response === 1) shell.openExternal(WEBSITE);
    });
}

function showAbout(lang) {
  const locale = lang || readConfig().language || "en";
  const text = aboutStrings(locale);
  configureAboutPanel(locale);

  // macOS 原生 About 的「版本」跟随系统语言，英文模式下用自定义弹窗
  if (process.platform === "darwin" && locale === "zh") {
    app.showAboutPanel();
    return;
  }

  showAboutDialog(locale, text);
}

function setAppMenu(lang) {
  const locale = lang || readConfig().language || "en";
  const text = aboutStrings(locale);

  if (process.platform === "darwin") {
    Menu.setApplicationMenu(
      Menu.buildFromTemplate([
        {
          label: "FontServer",
          submenu: [
            { label: text.menuAbout, click: () => showAbout(locale) },
            {
              label: text.menuWebsite,
              click: () => shell.openExternal(WEBSITE),
            },
            { type: "separator" },
            { role: "hide", label: text.menuHide },
            { role: "hideOthers", label: text.menuHideOthers },
            { role: "unhide", label: text.menuShowAll },
            { type: "separator" },
            { role: "quit", label: text.menuQuit },
          ],
        },
        {
          label: text.menuEdit,
          submenu: [
            { role: "copy" },
            { role: "paste" },
            { role: "selectAll" },
          ],
        },
      ])
    );
    return;
  }

  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: text.menuFile,
        submenu: [{ role: "quit", label: text.menuQuit }],
      },
      {
        label: text.menuEdit,
        submenu: [
          { role: "copy" },
          { role: "paste" },
          { role: "selectAll" },
        ],
      },
      {
        label: text.menuHelp,
        submenu: [
          { label: text.menuAbout, click: () => showAbout(locale) },
          {
            label: text.menuWebsite,
            click: () => shell.openExternal(WEBSITE),
          },
        ],
      },
    ])
  );
}

module.exports = { configureAboutPanel, setAppMenu, showAbout, WEBSITE, WEBSITE_LABEL };
