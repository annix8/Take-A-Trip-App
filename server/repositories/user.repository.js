const User = require('../models/user');

class UserRepository {
    findByUsername(username, callback) {
        User.findOne({username: username}, (err, userResponse) => {
            callback(err, userResponse);
        });
    }
}

module.exports = new UserRepository();