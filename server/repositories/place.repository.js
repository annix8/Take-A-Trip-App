const Place = require('../models/place');
const imageRepository = require('../repositories/image.repository');

class PlaceRepository {
    get(query, callback) {
        Place.find(query, (err, placesResponse) => {
            const placesJson = placesResponse.map(place => {
                const newPlace = place.toJSON();
                newPlace.images = newPlace.images.map(imageId => {
                    return `http://localhost:3200/api/images/${imageId._id}`;
                });
                newPlace.rating = newPlace.rating.value;

                return newPlace;
            });

            callback(err, placesJson);
        });
    }

    create(place) {
        const imageIds = imageRepository.createMany(place.images).map(x => { return { _id: x._id } });
        const placeModel = new Place(
            {
                name: place.name,
                address: place.address,
                images: imageIds
            }
        );

        placeModel.save();

        return placeModel;
    }

    rate(id, rating, callback){
        Place.findById(id, (err, place) =>{
            const ratingValue = place.rating.value;
            const totalVotes = place.rating.totalVotes;
            const newRating = (Number(ratingValue) + Number(rating)) / (Number(totalVotes) + 1);
            place.rating.value = newRating;
            place.rating.totalVotes++;
            place.save();
            callback(place);
        });
    }
}

module.exports = new PlaceRepository();