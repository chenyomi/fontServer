const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("fontServer", {
  getState: () => ipcRenderer.invoke("fontserver:get-state"),
  setService: (enabled) => ipcRenderer.invoke("fontserver:set-service", enabled),
  setAutostart: (enabled) => ipcRenderer.invoke("fontserver:set-autostart", enabled),
  showAbout: () => ipcRenderer.invoke("fontserver:show-about"),
  testConnection: () => ipcRenderer.invoke("fontserver:test-connection"),
  setPreferences: (prefs) => ipcRenderer.invoke("fontserver:set-preferences", prefs),
  onStateChange: (callback) => {
    const listener = (_event, state) => callback(state);
    ipcRenderer.on("fontserver:state-changed", listener);
    return () => ipcRenderer.removeListener("fontserver:state-changed", listener);
  },
});
