const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  generatePatches: (revs) => ipcRenderer.invoke('generate-patches', revs),
  getSettings: () => ipcRenderer.invoke('get-settings'),
  saveSettings: (config) => ipcRenderer.invoke('save-settings', config),
  onProgress: (callback) => ipcRenderer.on('patch-progress', callback),
});
