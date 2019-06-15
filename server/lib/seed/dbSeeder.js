const User = require('../../models/user');
const City = require('../../models/city');
const Country = require('../../models/country');
const Image = require('../../models/image');
const fs = require('fs');
const path = require('path');
const userData = require('./data/users.json');
const countryData = require('./data/countries.json');
const cityData = require('./data/cities.json');
const passwordService = require('../../services/password.service');

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
        seedUsers();
        seedCountries();
        setTimeout(seedCities, 8000);
    }
}

function seedUsers() {
    userData.forEach(user => {
        const userModel = new User({
            username: user.username,
            email: user.email,
            password: passwordService.hashPassword(user.password)
        });

        userModel.save();
    });
}

function seedCountries() {
    const countryNames = countryData.map(x => x.name);
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
                    const imgFullPath = path.join(__dirname, imgPath);
                    const file = fs.readFileSync(imgFullPath);
                    const imageModel = new Image({ file: file, contentType: 'image/png' });
                    imageModel.save();

                    placeImages.push({ _id: imageModel._id });
                });
                const currPlace = {...place};
                currPlace.img = placeImages;
                city.places.push(currPlace);
            });

            city.save();
        });
    });
}

module.exports = new DbSeeder();