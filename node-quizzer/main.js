const electron = require('electron');
const system = require('child_process');
// Module to control application life.
const {app} = electron;
// Module to create native browser window.
const {BrowserWindow} = electron;

var
  express = require('express'),
  url = require('url'),
  fs = require('fs'),
  path = require('path'),
  appx = express(),
  quizzer = require('node-quizzer'),
  _ = require('underscore-node'),
  getQuiz = function(method, req) {
    var urlParts = url.parse(req.url, true),
      query = urlParts.query,

      // generate random quiz
      quiz = quizzer[method]({
        uname: query.fullname,
        uemail: query.email,
        name: query.quiz,
        count: parseInt(query.count),
        time: parseInt(query.time),
        perc: parseInt(query.perc)
      });

    return quiz;
  };



function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 500,
    frame: true,
    alwaysOnTop: false,
    webPreferences: {
      plugins: true
    }
  });
  //win.setMenu(null);
  win.setResizable(true);



  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/public/index.html`);

  // Open the DevTools.
  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on('ready', createWindow);


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // system.exec('shutdown -s');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (winMain === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.