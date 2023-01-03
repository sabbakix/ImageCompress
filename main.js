const { app, BrowserWindow, Menu } = require("electron")


//Set env
process.env.NODE_ENV = 'development'
const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false

let mainWindow

function createMainWindow(){
    const mainWindow = new BrowserWindow({
        title: "ImageCompress",
        width: 800,
        height: 600,
        icon: `${__dirname}/assets/icons/compress-icon_225x225.png`,
        resizable: isDev
    })
    mainWindow.loadFile('./app/index.html')
}

app.on('ready', () => {
    createMainWindow()

    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)
    
    //mainWindow.on('closed',() => mainWindow = null)    
})

const menu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                click: () => app.quit()
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