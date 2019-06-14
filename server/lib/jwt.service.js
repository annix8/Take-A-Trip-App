const jwt = require('jsonwebtoken');

const jwt_secret = "jwt_secret";

class JwtService{
    signToken(payload){
        jwt.sign(payload, jwt_secret);
    }

    validateToken(token){
        jwt.verify(token, jwt_secret, function(err, decoded) {
            let result = {};
            if(err){
                result.error = {
                    ...err
                };
            }
            else{
                result = {
                    ...decoded
                };
            }

            return result;
       });
    }
}

module.exports = new JwtService();