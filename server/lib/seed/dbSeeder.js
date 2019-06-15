const User = require('../../models/user');
const City = require('../../models/city');
const Image = require('../../models/image');
const fs = require('fs');
const path = require('path');
const userData = require('./data/users.json');
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

function seedCities() {
    cityData.forEach(element => {
        let city = new City({ name: element.city, country: element.country });

        element.places.forEach(place => {
            const placeImages = [];
            place.imgs.forEach(imgPath => {
                const imgFullPath = path.join(__dirname, imgPath);
                const file = fs.readFileSync(imgFullPath);
                const imageModel = new Image({ file: file, contentType: 'image/png' });
                imageModel.save();

                placeImages.push({ _id: imageModel._id });
            });
            const currPlace = { ...place };
            currPlace.images = placeImages;
            city.places.push(currPlace);
        });

        city.save();
    });
}

module.exports = new DbSeeder();