const authenticationService = require('../../../services/authentication.service');
const util = require('../../../util');

class AuthenticationController {
    constructor(router) {
        router.post('/login', this.login.bind(this));
        router.post('/register', this.register.bind(this));
    }

    login(req, res) {
        const username = req.headers.username;
        const password = req.headers.password;

        authenticationService.authenticate(username, password, (err, result) => {
            return util.handleJsonResponse(res, err, result)
        });
    }

    register(req, res) {
        const username = req.headers.username;
        const email = req.headers.email;
        const password = req.headers.password;

        authenticationService.register(username, email, password,
            (err, result) => {
                return util.handleJsonResponse(res, err, result);
            });
    }
}

module.exports = AuthenticationController;