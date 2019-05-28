const express = require('express');
const mongoose = require('mongoose');
const router = require('./router');

const port = 3200;
const server = express();
const db = mongoose.connect('mongodb://localhost/take-a-trip-db');

class Server {
    constructor() {
        this.initRoutes();
        this.start();

        // seedDb();
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

// function seedDb(){
//     const City = require('./models/city');
//     let cities = ['Sofia', 'Plovdiv', 'Burgas', 'Varna', 'Pernik'];

//     for(let i = 0; i < cities.length; i++){
//         let cityObj = {
//             'name': cities[i]
//         };

//         let currCity = new City(cityObj);

//         currCity.save((err, city) =>{
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 console.log(`Generated city: ${city.name}`);
//             }
//         });
//     }
// }

const appServer = new Server();