const placeRepository = require('../../../repositories/place.repository');
const util = require('../../../util');

class PlaceController {
    constructor(router) {
        router.get('/', this.getAll.bind(this));
        router.get('/:id', this.getById.bind(this));
        router.get('/name/:name', this.getByName.bind(this));
    }

    getAll(req, res) {
        placeRepository.get({}, (err, places) => {
            return util.handleResponse(res, err, places);
        });
    }

    getById(req, res) {
        placeRepository.get({ _id: req.params.id }, (err, place) => {
            return util.handleResponse(res, err, place);
        });
    }

    getByName(req, res){
        const query = {
            name: { "$regex": req.params.name, "$options": "i" }
        };
        placeRepository.get(query, (err, places) => {
            return util.handleResponse(res, err, places);
        });
    }
}

module.exports = PlaceController;