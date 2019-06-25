const passwordService = require('./password.service');
const userRepository = require('../repositories/user.repository');
const jwtService = require('./jwt.service');
const util = require('../util');

class AuthenticationService {
    authenticate(username, password, callback) {
        userRepository.findByUsername(username, (err, user) => {
            if (err) {
                callback(err);
            }
            else {
                if (!user) {
                    callback(util.createResponseObject(false, "Invalid credentials"));
                }
                else {
                    const isPasswordValid = passwordService.checkPassword(password, user.password);
                    if (!isPasswordValid) {
                        callback(util.createResponseObject(false, "Invalid credentials"));
                    }
                    else {
                        const result = createSuccessResult(user);
                        callback(null, result);
                    }
                }
            }
        });
    }

    register(username, email, password, callback) {
        userRepository.create(username, email, passwordService.hashPassword(password),
            (err, user) => {
                if (err) {
                    if (err.code === 11000) {
                        return callback(util.createResponseObject(false, "Already existing username or email"));
                    }

                    callback(err);
                }
                else {
                    const result = createSuccessResult(user);
                    callback(null, result);
                }
            });
    }
}

function createSuccessResult(user) {
    const userData = createUserInfoForJwt(user);
    const jwtBearerToken = jwtService.signToken(userData);
    const result = util.createResponseObject(true, { token: jwtBearerToken });

    return result;
}

function createUserInfoForJwt(user) {
    const userObj = {
        user_name: user.username,
        user_email: user.email,
        user_id: user._id
    };

    return userObj;
}

module.exports = new AuthenticationService();