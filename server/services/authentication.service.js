const passwordService = require('./password.service');
const userRepository = require('../repositories/user.repository');
const jwtService = require('./jwt.service');

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
                    const jwtBearerToken = jwtService.signToken({
                        username: user.username
                    });
                    const result = {
                        success: true,
                        token: jwtBearerToken
                    };
                    callback(null, result);
                }
            }
        });
    }

    register(username, email, password, callback) {
        userRepository.create(username, email, passwordService.hashPassword(password),
            (err, user) => {
                if (err) {
                    callback(err);
                }
                else {
                    const jwtBearerToken = jwtService.signToken({
                        username: user.username
                    });
                    const result = {
                        success: true,
                        token: jwtBearerToken
                    };
                    callback(err, result);
                }
            });
    }
}

module.exports = new AuthenticationService();