const express = require('express');
const fs = require('fs');
const path = require('path');

class Router {
    constructor() {
        this.startFolder = null;
    }

    loadRoutes(server, folderName) {
        if (!this.startFolder) {
            this.startFolder = path.basename(folderName);
        }

        fs.readdirSync(folderName)
            .forEach(file => {
                const fullName = path.join(folderName, file);
                const isDir = fs.lstatSync(fullName).isDirectory();
                if (isDir) {
                    this.loadRoutes(server, fullName);
                }
                else if (file.toLowerCase().indexOf('.js')) {
                    const dirs = path.dirname(fullName).split(path.sep);
                    const startFolderIndex = dirs.indexOf(this.startFolder);
                    if(startFolderIndex > -1){
                        dirs.splice(startFolderIndex, 1);
                    }
                    
                    const controllerClass = require(`./${fullName}`);
                    const baseRoute = '/' + dirs.join('/');
                    const router = express.Router();
                    const controller = new controllerClass(router);
                    server.use(baseRoute, router);
                    console.log(`Generated api url: ${baseRoute}`);
                }
            });
    }
}

module.exports = new Router();