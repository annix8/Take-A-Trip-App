const userRepository = require('../../../repositories/user.repository');
const util = require('../../../util');

class UserController {
    constructor(router) {
        router.get('/ratingForPlace/:placeId', util.requireJwt.bind(this), this.getRatingForPlace.bind(this));
    }

    getRatingForPlace(req, res) {
        const tokenPayload = res.locals.token_payload;
        const userObj = {
            userId: tokenPayload.user_id,
            placeId: req.params.placeId
        }
        userRepository.getRatingForPlace(userObj, (err, rating) => {
            util.handleJsonResponse(res, err, util.createResponseObject(true, rating));
        });
    }
}

module.exports = UserController;