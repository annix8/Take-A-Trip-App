const User = require('../models/user');

class UserRepository {
    findByUsername(username, callback) {
        User.findOne({ username: username }, (err, userResponse) => {
            callback(err, userResponse);
        });
    }

    create(username, email, password, callback) {
        const user = new User({
            username: username,
            email: email,
            password: password
        });

        user.save((err, userResponse) => {
            callback(err, userResponse);
        });
    }

    ratePlace({ userId, placeId, placeName, rating }, callback) {
        User.findById(userId, (err, user) => {
            let userRatedPlace = false;
            const placeRatedByUser = user.ratedPlaces.find(x => x.placeId == place.placeId);
            if (!placeRatedByUser) {
                user.ratedPlaces.push({
                    placeId: placeId,
                    placeName: placeName,
                    rating: rating
                });

                userRatedPlace = false;
            }
            else {
                user.ratedPlaces.map(x => {
                    if (x.placeId == placeId) {
                        return {
                            placeId: x.placeId,
                            placeName: x.placeName,
                            rating: rating
                        };
                    }

                    return x;
                });

                userRatedPlace = true;
            }

            callback(null, userRatedPlace);
        });
    }
}


module.exports = new UserRepository();