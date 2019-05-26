const express = require('express');
const mongoose = require('mongoose');

const port = 3200;
const server = express();

class Server {
    constructor() {
        this.initRoutes();
        this.start();
    }

    start() {
        server.listen(port, () => {
            console.log(`Server listening on port ${port}...`);
        });
    }

    initRoutes() {
        server.get('/', (req, res) => {
            res.send("Server is working");
        });
    }
}

const appServer = new Server();