// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const server = require("./server");

/**
 * Generate a new browser window
 * @param {string<"client"|"server">} type The type of window to open
 * - "client" open the window relative to the client
 * - "server" open the window relative to the server
 * @param {string} [viewFile="index.html"] The path of the html file to use relative to the type
 * @param {string} [preloadFile="preload.js"] The path of the script to use as preload relative to the type
 */
function createWindow(type, viewFile = "index.html", preloadFile = "preload.js") {
  // Create the browser window
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, `${type}/resources/js/${preloadFile}`)
    }
  });

  const bounds = window.getBounds();
  switch(type) {
    case 'client':
      window.setBounds({x:bounds.x + 400});
    break;
    case 'server':
      window.setBounds({x:bounds.x - 400});
    break;
  }

  // and load the index.html of the app
  window.loadFile(path.join(__dirname, `${type}/views/${viewFile}`));

  // Open the DevTools.
  //window.webContents.openDevTools();
}

app.whenReady().then(() => {
  // User want to open client window
  ipcMain.handle("openClient", () => createWindow("client"));
  ipcMain.handle("sendMessage", (e, msg) => server.io.emit("message", msg));

  // Open the window for the client
  // createWindow("client");

  // Start server
  server.start().then((port) => {
    console.log(`Server listening on port ${port}`);
    // Open window for server
    createWindow("server");
  });
});
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});