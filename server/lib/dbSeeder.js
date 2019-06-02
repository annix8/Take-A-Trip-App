const mongoose = require('mongoose');
const City = require('../models/city');
const Place = require('../models/place');
const Country = require('../models/country');

const countryData = [
    "Bulgaria", "Spain", "England", "Germany", "France", "Portugal", "Italy"
];
const cityData = [
    {
        city: "Sofia",
        places: [
            { name: "Sveti Aleksandar Nevski", address: "Sofia center" },
            { name: "National Palace of Culture", address: "Sofia 10" },
            { name: "Zoo", address: "Sofia Hladilnika" }
        ],
        country: "Bulgaria"
    },
    {
        city: "Pernik",
        places: [
            { name: "Palace of Culture", address: "Pernik center" },
            { name: "Minyor Pernik Stadium", address: "Pernik 52" },
            { name: "Pernik park", address: "Pernik 50" }
        ],
        country: "Bulgaria"
    },
    {
        city: "Burgas",
        places: [
        ],
        country: "Bulgaria"
    }
];

class DbSeeder {
    seed() {
        City.find((err, cities) => {
            if (err) {
                console.log(err);
            }

            if (cities.length === 0) {
                this.seedData();
            }
        });
    }

    seedData() {
        seedCountries();
        setTimeout(seedCities, 5000);
    }
}

function seedCountries() {
    countryData.forEach(country => {
        const countryModel = new Country({
            name: country
        });

        countryModel.save();
    });
}

function seedCities() {
    cityData.forEach(element => {
        Country.findOne({ name: element.country }, (err, countryResult) => {
            let city = new City({ name: element.city });
            let country;
            if (countryResult) {
                country = countryResult; // because find returns an array
                country.cities.push({
                    _id: city._id,
                    name: city.name
                });
            }
            else {
                country = new Country({ name: element.country, cities: [{ name: city.name, _id: city._id }] });
            }

            country.save();
            city.country = {
                _id: country._id,
                name: country.name
            };
            element.places.forEach(place => {
                let currPlace = new Place(place);
                currPlace.save();
                city.places.push(currPlace);
            });

            city.save();
        });
    });
}

module.exports = new DbSeeder();