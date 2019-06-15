const City = require('../models/city');
const imageRepository = require('../repositories/image.repository');

class PlaceRepository {
    getById(placeId, callback) {
        City.findOne({ "places._id": placeId }, (err, city) => {
            const place = city.places.find(x => x._id == placeId);
            place.images = place.images.map(imageId => {
                return `http://localhost:3200/api/images/${imageId._id}`;
            });

            const result = {
                city: {
                    _id: city._id,
                    name: city.name
                },
                place: {
                    _id: place._id,
                    name: place.name,
                    images: place.images,
                    rating: place.ratings.reduce((p, c) => p + c, 0) / place.ratings.length
                }
            };

            callback(null, result);
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

    rate(id, rating, callback) {
        Place.findById(id, (err, place) => {
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