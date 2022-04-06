import { resolve } from 'path'
import { app, BrowserWindow } from 'electron'

let mainWindow: BrowserWindow | undefined

function createWindow() {
  mainWindow = new BrowserWindow({
    show: import.meta.env.DEV,
    width: 800,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // preload scripts must be an absolute path
      preload: resolve(__dirname, import.meta.env.ELECTRON_PRELOAD_URL)
    }
  })

  if (import.meta.env.DEV) {
    mainWindow.loadURL(import.meta.env.ELECTRON_APP_URL)
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.webContents.on('did-finish-load', function () {
      mainWindow.show()
    })

    mainWindow.loadFile(import.meta.env.ELECTRON_APP_URL)
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow == null) {
    createWindow()
  }
})
