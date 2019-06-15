const City = require('../models/city');
const imageRepository = require('../repositories/image.repository');

class CityRepository {
    getCity(mongooseQueryObject, callback) {
        City.find(mongooseQueryObject.find, (err, cityResponse) => {
            callback(err, cityResponse);
        }).select(mongooseQueryObject.select);
    }

    getPlaceById(placeId, callback){
        City.findOne({ "places._id": placeId }, (err, city) => {
            const cityCopy = city.toJSON();
            const place = cityCopy.places.find(x => x._id == placeId);
            place.images = place.images.map(imageId => {
                return `http://localhost:3200/api/images/${imageId._id}`;
            });

            const result = {
                _id: place._id,
                address: place.address,
                name: place.name,
                images: place.images,
                rating: place.ratings.reduce((p, c) => p + c, 0) / place.ratings.length
            };

            callback(err, result);
        });
    }

    createPlace(place, callback) {
        const imageIds = imageRepository.createMany(place.images).map(x => { return { _id: x._id } });
        const placeModel = {
            name: place.name,
            address: place.address,
            images: imageIds
        }

        City.findById(place.cityId, (err, city) =>{
            city.places.push(placeModel);
            city.save();
            callback(err, city);
        });
    }
}

module.exports = new CityRepository();