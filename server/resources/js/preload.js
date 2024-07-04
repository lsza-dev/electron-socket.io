const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('app', {
  openClient: () => ipcRenderer.invoke('openClient'),
  sendMessage: (msg) => ipcRenderer.invoke('sendMessage', msg)
});