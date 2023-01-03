const { app, BrowserWindow, Menu, globalShortcut } = require('electron')

//Set env
process.env.NODE_ENV = 'development'
const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false

let win

app.whenReady().then(() => {
    win = new BrowserWindow({ 
        title: "ImageCompress",
        width: 800, 
        height: 600,
        icon: `${__dirname}/assets/icons/compress-icon_225x225.png`
    })
    
    win.loadFile('./app/index.html')

    const mainMenu = Menu.buildFromTemplate(menu)
    //Menu.setApplicationMenu(mainMenu)

    globalShortcut.register('CmdOrCtrl+K', () => {
        win.restore()
    })

})






const menu = [
    ...(isMac ? [{ role: 'appMenu'}] : []),
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+W',
                click: () => app.quit()
            },
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+K',
                click: () => win .reload()
            }
        ]
    }
]

app.on('window-all-closed', () => {
    if (!isMac){
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0){
        createMainWindow()
    }
})