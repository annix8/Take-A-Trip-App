const express = require('express');
const mongoose = require('mongoose');
const router = require('./router');
const dbSeeder = require('./lib/dbSeeder');

const port = 3200;
const server = express();
const db = mongoose.connect('mongodb://localhost/take-a-trip-db');

class Server {
    constructor() {
        this.initRoutes();
        this.start();
        // dbSeeder.seed();
    }

    start() {
        server.listen(port, () => {
            console.log(`Server listening on port ${port}...`);
        });
    }

    initRoutes() {
        server.get('/', (req, res) => {
            res.send("Server is working...");
        });

        router.loadRoutes(server, './controllers');
    }
}

const appServer = new Server();