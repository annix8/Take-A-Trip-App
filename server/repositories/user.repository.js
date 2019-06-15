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
}

module.exports = new UserRepository();