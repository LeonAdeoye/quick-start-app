const { app, BrowserWindow, Menu, MenuItem, ipcMain} = require('electron');

let win;

// Below code removes commented warning:
// Electron Security Warning (Insecure Content-Security-Policy) This renderer process has either no Content Security
// Policy set or a policy with "unsafe-eval" enabled. This exposes users of this app to unnecessary security risks.
// For more information and help, consult https://electronjs.org/docs/tutorial/security. This warning will not show up once the app is packaged.
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createWindow()
{
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1000,
    minHeight: 600,
    backgroundColor: '#ffffff',
    frame: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  });

  // TODO update the app's name in load URL
  win.loadURL(`file://${__dirname}/dist/quick-start-app/index.html`);

  // Uncomment to debug.
  //win.webContents.openDevTools();

  win.on('closed', () =>
  {
    win = null
  });

  // This event will be fired when all of the renderer's component and service constructors have ran - when the renderer (browser) is ready
  win.webContents.once('did-finish-load',() =>
  {
    win.webContents.send('browser-ready-signal', 'sending browser-ready-signal from the backend process to browser component/service');
  });
}

app.on('ready', createWindow);

// This listener is invoked only the next time a message is sent to channel, after which it is removed.
app.once('window-all-closed', () =>
{
  if(process.platform !== 'darwin')
  {
    app.quit();
  }
});

app.on('activate', () =>
{
  if(win == null)
  {
    createWindow();
  }
});

// Below code show you how to receive messages from the browser/renderer.
ipcMain.on('command-signal', (event, command) =>
{
  if(command)
  {
    console.log(`Received ${command} from renderer/browser.`);
    switch (command)
    {
      case "close-app-command":
        app.quit();
        break;
      case "minimize-app-command":
        win.minimize();
        break;
      case "toggle-maximization-command":
        win.isMaximized() ? win.unmaximize() : win.maximize();
        break;
    }
  }
});


