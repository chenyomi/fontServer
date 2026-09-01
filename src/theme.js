const { nativeTheme } = require("electron");

const ACCENT_IDS = ["purple", "blue", "teal", "rose"];

const ACCENTS = {
  purple: {
    start: "#4f46e5",
    end: "#7c3aed",
    accent: "#7c3aed",
    accent2: "#6d28d9",
    softLight: "rgba(124, 58, 237, 0.14)",
    glowLight: "rgba(124, 58, 237, 0.42)",
    softDark: "rgba(124, 58, 237, 0.22)",
    glowDark: "rgba(124, 58, 237, 0.5)",
    bgLight: "#f3f2f8",
    bgDark: "#16141f",
    shadow: "rgba(79, 70, 229, 0.28)",
  },
  blue: {
    start: "#2563eb",
    end: "#3b82f6",
    accent: "#3b82f6",
    accent2: "#1d4ed8",
    softLight: "rgba(59, 130, 246, 0.14)",
    glowLight: "rgba(59, 130, 246, 0.42)",
    softDark: "rgba(59, 130, 246, 0.22)",
    glowDark: "rgba(59, 130, 246, 0.5)",
    bgLight: "#f2f6fc",
    bgDark: "#141820",
    shadow: "rgba(37, 99, 235, 0.28)",
  },
  teal: {
    start: "#0d9488",
    end: "#14b8a6",
    accent: "#14b8a6",
    accent2: "#0f766e",
    softLight: "rgba(20, 184, 166, 0.14)",
    glowLight: "rgba(20, 184, 166, 0.42)",
    softDark: "rgba(20, 184, 166, 0.22)",
    glowDark: "rgba(20, 184, 166, 0.5)",
    bgLight: "#f1f8f7",
    bgDark: "#121a19",
    shadow: "rgba(13, 148, 136, 0.28)",
  },
  rose: {
    start: "#e11d48",
    end: "#f43f5e",
    accent: "#f43f5e",
    accent2: "#be123c",
    softLight: "rgba(244, 63, 94, 0.14)",
    glowLight: "rgba(244, 63, 94, 0.42)",
    softDark: "rgba(244, 63, 94, 0.22)",
    glowDark: "rgba(244, 63, 94, 0.5)",
    bgLight: "#faf2f4",
    bgDark: "#1a1416",
    shadow: "rgba(225, 29, 72, 0.28)",
  },
};

function getAccent(id) {
  return ACCENTS[id] || ACCENTS.purple;
}

function applyAppearance(mode) {
  nativeTheme.themeSource = mode === "light" || mode === "dark" || mode === "system" ? mode : "system";
}

function isDarkMode(appearance) {
  if (appearance === "dark") return true;
  if (appearance === "light") return false;
  return nativeTheme.shouldUseDarkColors;
}

function panelBackground(appearance, accentId) {
  const accent = getAccent(accentId);
  return isDarkMode(appearance) ? accent.bgDark : accent.bgLight;
}

module.exports = {
  ACCENT_IDS,
  ACCENTS,
  getAccent,
  applyAppearance,
  isDarkMode,
  panelBackground,
};
