const City = require('../models/city');
const Place = require('../models/place');
const Country = require('../models/country');
const Image = require('../models/image');
const fs = require('fs');
const https = require('https');
const countryData = require('./seed-data-constants').countryData;
const cityData = require('./seed-data-constants').cityData;

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
        seedCountriesFromApi();
        setTimeout(seedCities, 8000);
    }
}

function seedCountriesFromApi() {
    var req = https.get('https://restcountries.eu/rest/v2/all', function (res) {        
        var bodyChunks = [];
        res.on('data', function (chunk) {
            bodyChunks.push(chunk);
        }).on('end', function () {
            var body = Buffer.concat(bodyChunks);
            const countryNames = JSON.parse(body).map(x => x.name);
            seedCountries(countryNames);
        });
    });

    req.on('error', function (e) {
        console.log('ERROR: ' + e.message);
        seedCountries();
    });
}

function seedCountries(countryNames = countryData) {
    countryNames.forEach(country => {
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
                country = countryResult;
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
                place.imgs.forEach(imgPath => {
                    const imgFullPath = __dirname + imgPath;
                    const file = fs.readFileSync(imgFullPath);
                    const imageModel = new Image({ file: file, contentType: 'image/png' });
                    imageModel.save();

                    placeImages.push({ _id: imageModel._id });
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