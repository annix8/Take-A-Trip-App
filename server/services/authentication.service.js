const passwordService = require('./password.service');
const userRepository = require('../repositories/user.repository');

const invalidCredentialsObj = {
    success: false,
    error: "Invalid credentials"
}

class AuthenticationService {
    authenticate(username, password, callback) {
        userRepository.findByUsername(username, (err, user) => {
            if (err) {
                callback(err);
            }
            else {
                if (!user) {
                    callback(invalidCredentialsObj);
                }

                const isPasswordValid = passwordService.checkPassword(password, user.password);
                if (!isPasswordValid) {
                    callback(invalidCredentialsObj);
                }
                else {
                    callback(null, user);
                }
            }
        });
    }

    register(username, email, password, callback) {
        userRepository.create(username, email, passwordService.hashPassword(password),
            (err, user) => {
                callback(err, user);
            });
    }
}

module.exports = new AuthenticationService();