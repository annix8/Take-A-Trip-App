const mongoose = require('mongoose');
const City = require('../models/city');
const Place = require('../models/place');

const data = [
    {
        city: "Sofia",
        places: [
            { name: "Sveti Aleksandar Nevski", address: "Sofia center" },
            { name: "National Palace of Culture", address: "Sofia 10" },
            { name: "Zoo", address: "Sofia Hladilnika" }
        ]
    },
    {
        city: "Pernik",
        places: [
            { name: "Palace of Culture", address: "Pernik center" },
            { name: "Minyor Pernik Stadium", address: "Pernik 52" },
            { name: "Pernik park", address: "Pernik 50" }
        ]
    },
    {
        city: "Burgas",
        places: [
        ]
    }
];

class DbSeeder {
    seed() {
        City.find((err, cities) =>{
            if(err){
                console.log(err);
            }

            if(cities.length === 0){
                this.seedData();
            }
        });
    }

    seedData() {
        data.forEach(element => {
            let city = new City({ name: element.city });
            element.places.forEach(place => {
                let currPlace = new Place(place);
                currPlace.save();
                city.places.push(currPlace);
            });

            city.save();
        });
    }
}

module.exports = new DbSeeder();