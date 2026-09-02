const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('classroomStarters', {
  platform: process.platform,
  isDesktopApp: true,
});
