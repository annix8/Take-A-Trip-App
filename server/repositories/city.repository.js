const City = require('../models/city');

class CityRepository {
    get(/*MongooseQueryObject*/mongooseQueryObject, callback) {
        City.find(mongooseQueryObject.find, (err, cityResponse) => {
            callback(err, cityResponse);
        }).select(mongooseQueryObject.select);
    }

    addPlace(cityId, place, callback){
        City.findById(cityId, (err, city) =>{
            city.places.push(place);
            city.save();
            callback(err, city);
        })
    }
}

module.exports = new CityRepository();