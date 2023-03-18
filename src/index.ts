import { app, BrowserWindow, nativeImage, autoUpdater, dialog } from 'electron';
import updateElectron from "update-electron-app"

updateElectron({
    repo: 'github.com/DnsChanger/dnsChanger-desktop',
    updateInterval: '5 minutes',
    logger: require('electron-log'),
    notifyUser: true
})
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = (): void => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        height: 600,
        width: 500,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
        darkTheme: true,
        resizable: false,
    });
    const appIcon = nativeImage.createFromPath("./assets/logo.png")

    mainWindow.setMenu(null)

    mainWindow.setIcon(appIcon)

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    // Open the DevTools.
    if (process.env.ENV)
        mainWindow.webContents.openDevTools();

};


app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

import "./main/ipc/dialogs"
import "./main/ipc/notif"
import "./main/ipc/ui"
import * as process from "process";

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

