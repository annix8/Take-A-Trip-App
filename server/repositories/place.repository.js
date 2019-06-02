const Place = require('../models/place');

class PlaceRepository {
    get(query, callback) {
        Place.find(query, (err, placesResponse) => {
            const placesJson = placesResponse.map(place => {
                const newPlace = place.toJSON();
                newPlace.images = newPlace.images.map(imageId => {
                    return `http://localhost:3200/api/images/${imageId._id}`;
                });

                return newPlace;
            });

            callback(err, placesJson);
        });
    }
}

module.exports = new PlaceRepository();