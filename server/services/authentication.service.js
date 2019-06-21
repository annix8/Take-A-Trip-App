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
                else {
                    const isPasswordValid = passwordService.checkPassword(password, user.password);
                    if (!isPasswordValid) {
                        callback(invalidCredentialsObj);
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
                    callback(err);
                }
                else {
                    const result = createSuccessResult(user);
                    callback(null, result);
                }
            });
    }
}

function createSuccessResult(user){
    const userData = createUserInfoForJwt(user);
    const jwtBearerToken = jwtService.signToken(userData);
    const result = {
        success: true,
        token: jwtBearerToken
    };

    return result;
}

function createUserInfoForJwt(user){
    const userObj = {
        username: user.username,
        email: user.email,
        user_id: user._id
    };

    return userObj;
}

module.exports = new AuthenticationService();