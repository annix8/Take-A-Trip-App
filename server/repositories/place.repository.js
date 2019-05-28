const Place = require('../models/place');

class PlaceRepository {
    get(query, callback){
        Place.find(query, (err, placeResponse) =>{
            callback(err, placeResponse);
        });
    }
}

module.exports = new PlaceRepository();