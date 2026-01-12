const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("jshell", {
  execute: (code) => ipcRenderer.invoke("execute", code)
});
