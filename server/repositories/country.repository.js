const Country = require('../models/country');

class CountryRepository {
    get(/*MongooseQueryObject*/mongooseQueryObject, callback) {
        Country.find(mongooseQueryObject.find, (err, countryResponse) => {
            callback(err, countryResponse);
        }).select(mongooseQueryObject.select);
    }
}

module.exports = new CountryRepository();