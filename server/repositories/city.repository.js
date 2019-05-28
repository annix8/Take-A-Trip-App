const City = require('../models/city');

class CityRepository {
    get(query, callback){
        City.find(query, (err, cityResponse) =>{
            callback(err, cityResponse);
        });
    }
}

module.exports = new CityRepository();