const jwt = require('jsonwebtoken')

class AuthenticationController {
    constructor(router) {
        router.get('/login', this.login.bind(this));
    }

    login(req, res) {
        const jwtBearerToken = jwt.sign({ foo: 'bar' }, 'shhh');

        return res.json(jwtBearerToken);
    }

    logout(req, res) {

    }
}

module.exports = AuthenticationController;