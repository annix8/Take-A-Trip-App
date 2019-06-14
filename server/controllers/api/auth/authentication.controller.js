const jwtService = require('../../../services/jwt.service');
const authenticationService = require('../../../services/authentication.service');
const util = require('../../../util');

class AuthenticationController {
    constructor(router) {
        router.post('/login', this.login.bind(this));
    }

    login(req, res) {
        const username = req.headers.username;
        const password = req.headers.password;
        authenticationService.authenticate(username, password, (err, user) => {
            if (err) {
                return util.handleJsonResponse(res, err);
            }

            const jwtBearerToken = jwtService.signToken({});
            const result = {
                success: true,
                token: jwtBearerToken
            };
            return util.handleJsonResponse(res, null, result);
        });
    }
}

module.exports = AuthenticationController;