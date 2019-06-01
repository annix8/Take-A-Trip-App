const City = require('../models/city');

class CityRepository {
    get(/*MongooseQueryObject*/mongooseQueryObject, callback) {
        City.find(mongooseQueryObject.find, (err, cityResponse) => {
            callback(err, cityResponse);
        }).select(mongooseQueryObject.select);
    }
}

module.exports = new CityRepository();