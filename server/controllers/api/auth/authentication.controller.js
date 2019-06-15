const authenticationService = require('../../../services/authentication.service');
const util = require('../../../util');

class AuthenticationController {
    constructor(router) {
        router.post('/login', this.login.bind(this));
        router.post('/register', this.register.bind(this));
        router.get('/test', util.requireJwt.bind(this), this.testAuth.bind(this));
    }

    testAuth(req, res){
        return res.send("You are ok");
    }

    login(req, res) {
        const username = req.body.username;
        const password = req.body.password;

        authenticationService.authenticate(username, password, (err, result) => {
            return util.handleJsonResponse(res, err, result)
        });
    }

    register(req, res) {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        authenticationService.register(username, email, password,
            (err, result) => {
                return util.handleJsonResponse(res, err, result);
            });
    }
}

module.exports = AuthenticationController;