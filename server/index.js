const express = require('express');
const mongoose = require('mongoose');
const router = require('./router');
const dbSeeder = require('./lib/seed/dbSeeder');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 3200;
const server = express();
const db = mongoose.connect('mongodb://localhost/take-a-trip-db');



class Server {
    constructor() {
        this.configureCors();
        this.configureBodyParser();
        this.initRoutes();
        this.start();
        dbSeeder.seed();
    }

    configureCors() {
        server.use(cors({
            origin: "http://localhost:4200",
            optionsSuccessStatus: 200
        }));
    }

    configureBodyParser() {
        server.use(bodyParser.urlencoded({ extended: true }));
        server.use(bodyParser.json());
    }

    initRoutes() {
        server.get('/', (req, res) => {
            res.send("Server is working...");
        });

        router.loadRoutes(server, './controllers');
    }

    start() {
        server.listen(port, () => {
            console.log(`Server listening on port ${port}...`);
        });
    }
}

const appServer = new Server();