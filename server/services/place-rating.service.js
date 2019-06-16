const cityRepository = require('../repositories/city.repository');
const userRepository = require('../repositories/user.repository');

class PlaceRatingService {
    rate(rateObj = { cityId, userId, placeId, rating }, callback) {
        cityRepository.ratePlace(rateObj, (cityUpdateResult) => {
            if (cityUpdateResult.success === true) {
                const ratePlaceObj = {
                    userId: rateObj.userId,
                    placeId: rateObj.placeId,
                    placeName: cityUpdateResult.place.name,
                    rating: rateObj.rating
                };

                userRepository.ratePlace(ratePlaceObj, (userRateResult) => {
                    callback(null, userRateResult);
                });
            }
            else {
                callback(cityUpdateResult);
            }
        });
    }
}

module.exports = new PlaceRatingService();