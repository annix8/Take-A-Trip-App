const cityRepository = require('../../../repositories/city.repository');
const util = require('../../../util');

class CityController {
    constructor(router) {
        router.get('/', this.getAll.bind(this));
        router.get('/:id', this.getById.bind(this));
        router.get('/name/:name', this.getByName.bind(this));
    }

    getAll(req, res) {
        cityRepository.get({}, (err, city) => {
            return util.handleResponse(res, err, city);
        });
    }

    getById(req, res) {
        const query = {
            _id: req.params.id
        };
        cityRepository.get(query, (err, city) => {
            return util.handleResponse(res, err, city);
        })
    }

    getByName(req, res) {
        const query = {
            name: { "$regex": req.params.name, "$options": "i" }
        };
        cityRepository.get(query, (err, cities) => {
            return util.handleResponse(res, err, cities);
        });
    }
}

module.exports = CityController;