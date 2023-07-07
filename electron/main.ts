import { app, BrowserWindow, Menu, globalShortcut, ipcMain } from 'electron'
import path from 'path';
import template from './menu'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')

// console.log(path.join(__dirname, 'preload.js'));

let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    width: 450,
    height: 700,
    center: true,
    icon: path.join(process.env.PUBLIC, 'favicon.ico'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  })


  Menu.setApplicationMenu(null)

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  // 使用ctrl + F12 开启调试
  globalShortcut.register('CmdOrCtrl+F12', () => {
    // win?.webContents.executeJavaScript(`console.log(F12)`
    win?.webContents.openDevTools()
  })
  //F5 刷新
  globalShortcut.register('F5', () => {
    // win?.webContents.executeJavaScript(`console.log(F12)`
    win?.webContents.reload()
  })


  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

app.on('window-all-closed', () => {
  win = null;
  app.quit();
})

app.whenReady().then(createWindow)

/**
 * 监听渲染进程发送的消息
 */
ipcMain.handle('change-window-size', (event, isLogin) => {

  if (isLogin) {
    win.unmaximize()
    // win?.setSize(450,700,true)
    Menu.setApplicationMenu(null)
    return
  }
  let m = Menu.buildFromTemplate(template(win))
  Menu.setApplicationMenu(m)
  win.maximize()
})
