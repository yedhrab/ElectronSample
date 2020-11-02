const electron = require("electron")
const url = require("url")
const path = require("path")

const { app, BrowserWindow, globalShortcut } = electron

let mainWindow
let tray

function createWindow() {
    // Yeni bir pencere oluşturma
    mainWindow = new BrowserWindow({})

    // HTML verilerini yeni pencereye aktarma file://__dirname/mainWindow.html
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "mainWindow.html"),
        protocol: "file",
        slashes: true
    }))
}

// Uygulama hazır olana kadar bekler
app.whenReady().then(() => {
    // Evernsel bir kısayol ile uygulamayı aktif ediyoruz
    if (!globalShortcut.register("Control+L", createWindow)) {
        console.log("Kısayol kaydı başarısız")
    }
})

// Pencereler kapandığı zaman uygulamanın sonlanmasını engeller
app.on('window-all-closed', (e) => {
    e.preventDefault()
    e.returnValue = false
    console.log("Uygulamanın kapanması engellendi")
})

// Uygulama kapandığında tüm kısayolları iptal ediyoruz
app.on("will-quit", () => {
    globalShortcut.unregisterAll()
    console.log("Tüm kısayollar iptal edildi")
})