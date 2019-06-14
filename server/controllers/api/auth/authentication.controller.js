const jwtService = require('../../../services/jwt.service');

class AuthenticationController {
    constructor(router) {
        router.get('/login', this.login.bind(this));
    }

    login(req, res) {
        const jwtBearerToken = jwtService.signToken({foo: 'bar'});

        return res.json(jwtBearerToken);
    }
}

module.exports = AuthenticationController;