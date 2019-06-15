const jwt = require('jsonwebtoken');

const jwt_secret = "jwt_secret";

class JwtService {
    signToken(payload) {
        return jwt.sign({
            ...payload,
            exp: Math.floor(Date.now() / 1000) + (60 * 60) // sets 1 hour expiration time
        }, jwt_secret);
    }

    validateToken(token) {
        try {
            const payload = jwt.verify(token, jwt_secret);
            return {
                success: true,
                payload: payload
            };
        }
        catch (err) {
            return {
                success: false,
                error: err.message
            };
        }
    }
}

module.exports = new JwtService();