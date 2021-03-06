const cityRepository = require('../../../repositories/city.repository');
const util = require('../../../util');
const MongooseQueryObject = require('../../../lib/mongoose-query-object');

class CityController {
    constructor(router) {
        router.get('/', this.getAll.bind(this));
        router.get('/:id', this.getById.bind(this));
        router.get('/name/:name', this.getByName.bind(this));
    }

    getAll(req, res) {
        const queryObj = new MongooseQueryObject(
            {},
            util.getExcludeParams(req)
        );
        cityRepository.getCity(queryObj, (err, city) => {
            return util.handleJsonResponse(res, err, util.createResponseObject(true, city));
        });
    }

    getById(req, res) {
        const queryObj = new MongooseQueryObject(
            { _id: req.params.id },
            util.getExcludeParams(req)
        );
        cityRepository.getCity(queryObj, (err, city) => {
            return util.handleJsonResponse(res, err, util.createResponseObject(true, city[0]));
        })
    }

    getByName(req, res) {
        const queryObj = new MongooseQueryObject(
            { name: { "$regex": req.params.name, "$options": "i" } },
            util.getExcludeParams(req)
        );
        cityRepository.getCity(queryObj, (err, cities) => {
            return util.handleJsonResponse(res, err, util.createResponseObject(true, cities));
        });
    }
}

module.exports = CityController;