const userRepository = require('../../../repositories/user.repository');
const util = require('../../../util');

class UserController {
    constructor(router) {
        router.get('/:id/ratingForPlace/:placeId', this.getRatingForPlace.bind(this));
    }

    // TODO: maybe get user id from jwt
    getRatingForPlace(req, res) {
        const userObj = {
            userId: req.params.id,
            placeId: req.params.placeId
        }
        userRepository.getRatingForPlace(userObj, (err, rating) => {
            util.handleJsonResponse(res, err, util.createResponseObject(true, rating));
        });
    }
}

module.exports = UserController;