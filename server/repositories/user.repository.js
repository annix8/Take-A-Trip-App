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
            const userCopy = user.toJSON();
            const allOtherPlaces = userCopy.ratedPlaces.filter(place => place.placeId != placeId);
            const placeToAdd = { placeId: placeId, placeName: placeName, rating: rating };
            allOtherPlaces.push(placeToAdd);
            user.ratedPlaces = allOtherPlaces;

            user.save();
            callback({ success: true });
        });
    }

    getRatingForPlace({ userId, placeId }, callback) {
        User.findById(userId, (err, user) => {
            const userCopy = user.toJSON();
            const place = userCopy.ratedPlaces.find(place => place.placeId == placeId);
            let rating = 0;
            console.log(place);
            console.log(placeId);
            if (place) {
                rating = place.rating;
            }

            callback(null, rating);
        });
    }
}


module.exports = new UserRepository();