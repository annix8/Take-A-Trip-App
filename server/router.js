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
                const fullFileName = path.join(folderName, file);
                const isDir = fs.lstatSync(fullFileName).isDirectory();

                if (isDir) {
                    this.loadRoutes(server, fullFileName);
                }
                else if (isJsFile(file)) {
                    const controllerClass = require(`./${fullFileName}`);
                    const router = express.Router();

                    const controller = new controllerClass(router);

                    const baseRoute = getBaseRouteDir(fullFileName, this.startFolder);
                    server.use(baseRoute, router);
                    console.log(`Generated api url: ${baseRoute}`);
                }
            });


        function isJsFile(file) {
            return file.toLowerCase().indexOf('.js');
        }

        function getBaseRouteDir(fileFullName, startFolder) {
            const dirs = path.dirname(fileFullName).split(path.sep);
            const startFolderIndex = dirs.indexOf(startFolder);
            if (startFolderIndex > -1) {
                dirs.splice(startFolderIndex, 1);
            }

            return '/' + dirs.join('/');
        }
    }
}

module.exports = new Router();