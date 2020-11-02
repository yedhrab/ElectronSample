const electron = require("electron")
const url = require("url")
const path = require("path");

const { app, BrowserWindow } = electron;

let mainWindow;

// Uygulama hazır olana kadar bekleme
app.on("ready", function () {
    // Yeni bir pencere oluşturma
    mainWindow = new BrowserWindow({});

    // HTML verilerini yeni pencereye aktarma file://__dirname/mainWindow.html
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "mainWindow.html"),
        protocol: "file",
        slashes: true
    }));
})