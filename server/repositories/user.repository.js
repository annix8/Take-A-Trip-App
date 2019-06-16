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
            const allOtherPlaces = user.ratedPlaces.filter(place => place.placeId != placeId);
            const placeToAdd = { placeId: placeId, placeName: placeName, rating: rating };
            allOtherPlaces.push(placeToAdd);
            user.ratePlaces = allOtherPlaces;

            user.save();
            callback(null, {success: true});
        });
    }
}


module.exports = new UserRepository();