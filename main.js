//import path from path
//import os from os
//import { app, BrowserWindow, Menu, globalShortcut, ipcMain, shell} from 'electron'


const path = require('path')
const os = require('os')
const { app, BrowserWindow, Menu, globalShortcut, ipcMain, shell} = require('electron')
//const imagemin = require('imagemin')
//const imageminMozjpeg = require('imagemin-mozjpeg')
//const imageminPngquant = require('imagemin-pngquant')
//const slash = require('slash')


 

//Set env
process.env.NODE_ENV = 'development'
const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false

let mainWindow
let aboutWindow

function createMainWindow() {
    mainWindow = new BrowserWindow({ 
        title: "ImageCompress",
        width: (isDev ? 800 : 450),
        height: 550,
        resizable: false,
        icon: `${__dirname}/assets/icons/compress-icon_225x225.png`,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
    })
    if(isDev){
        mainWindow.webContents.openDevTools()
    }
    mainWindow.loadFile('./app/index.html')
}

function createAboutWindow() {
    aboutWindow = new BrowserWindow({ 
        title: "Abou ImageCompress",
        width: 300, 
        height: 300,
        resizable: false,
        icon: `${__dirname}/assets/icons/compress-icon_225x225.png`
    })
    
    aboutWindow.loadFile('./app/about.html')
}

app.whenReady().then(() => {
    
    createMainWindow()

    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)

    globalShortcut.register('CmdOrCtrl+.', () => {
        mainWindow.restore()
    })

})

const menu = [
    ...(isMac ? [{ 
        label: app.name,
        submenu:[
            {
                label:'About',
                click: createAboutWindow,
            }
        ]
    }] : []),
    {
        role: 'fileMenu',
    },
    ...(isDev ? [
        {
            label: 'Developer',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { type: 'separator' },
                { role: 'toggledevtools' },
            ]
        }
    ]:[]),
    {
        label: 'Help',
        submenu:[
            {
                label: 'About',
                click: createAboutWindow,
            },
        ]

    }
]


/*
ipcMain.on('image:minimize',(e,options)=>{
    //options.dest = path.join(os.homedir(),'imagecompress')
    compressImage(options)
    console.log(options)
})

async function compressImage({imgPath, quality, dest}){
    try{
        const pngQuality = quality / 100
        const files = await imagemin([slash(imgPath)],{
            destination: dest,
            plugins:[
                imageminMozjpeg({quality}),
                imageminPngquant({
                    quality: [pngQuality,pngQuality]
                })
            ]
        })

        console.log(files)
        shell.openPath(dest)
    }catch(err){
        console.log(err)
    }
}
*/

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