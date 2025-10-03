const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  connectWhatsApp: () => ipcRenderer.send('connect-whatsapp'),
  disconnectWhatsApp: () => ipcRenderer.send('disconnect-whatsapp'),
  toggleBot: (active) => ipcRenderer.send('toggle-bot', active),
  saveData: () => ipcRenderer.send('save-data'),
  
  onQRReceived: (callback) => ipcRenderer.on('qr-received', (event, qr) => callback(qr)),
  onWhatsAppConnected: (callback) => ipcRenderer.on('whatsapp-connected', callback),
  onWhatsAppDisconnected: (callback) => ipcRenderer.on('whatsapp-disconnected', callback),
  onLog: (callback) => ipcRenderer.on('log', (event, message) => callback(message))
});