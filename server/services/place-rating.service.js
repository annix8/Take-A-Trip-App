const cityRepository = require('../repositories/city.repository');
const userRepository = require('../repositories/user.repository');
const util = require('../util');

class PlaceRatingService {
    rate(rateObj = { userId, placeId, rating }, callback) {
        cityRepository.ratePlace(rateObj, (err, cityUpdateResult) => {
            const ratePlaceObj = {
                userId: rateObj.userId,
                placeId: rateObj.placeId,
                placeName: cityUpdateResult.name,
                rating: rateObj.rating
            };

            userRepository.ratePlace(ratePlaceObj, (err, userRateResult) => {
                callback(err, cityUpdateResult);
            });
        });
    }
}

module.exports = new PlaceRatingService();