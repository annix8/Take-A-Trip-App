const mongoose = require('mongoose');
const City = require('../models/city');
const Place = require('../models/place');
const Country = require('../models/country');
const Image = require('../models/image');
const fs = require('fs');

const countryData = [
    "Bulgaria", "Spain", "England", "Germany", "France", "Portugal", "Italy"
];
const cityData = [
    {
        city: "Sofia",
        places: [
            { name: "Saint Alexander Nevsky Cathedral", address: "pl. Sveti Aleksandar Nevski, 1000 Sofia Center, Sofia", imgs: ["/images/nevski-cathedral-1.jpg", "/images/nevski-cathedral-1.jpg"] },
            { name: "National Palace of Culture", address: "Sofia 10", imgs: [] },
            { name: "Zoo", address: "Sofia Hladilnika", imgs: [] }
        ],
        country: "Bulgaria"
    },
    {
        city: "Pernik",
        places: [
            { name: "Palace of Culture", address: "Pernik center", imgs: [] },
            { name: "Minyor Pernik Stadium", address: "Pernik 52", imgs: [] },
            { name: "Pernik park", address: "Pernik 50", imgs: [] }
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
                const placeImages = [];
                place.imgs.forEach(imgPath =>{
                    const imgFullPath = __dirname + imgPath;
                    const file = fs.readFileSync(imgFullPath);
                    const imageModel = new Image({file: file, contentType: 'image/png'});
                    imageModel.save();

                    placeImages.push({_id: imageModel._id});
                });
                let currPlace = new Place(place);
                currPlace.images = placeImages;
                currPlace.save();
                city.places.push(currPlace);
            });

            city.save();
        });
    });
}

module.exports = new DbSeeder();