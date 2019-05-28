const City = require('../../../models/city');
const util = require('../../../util');

class CityController {
    constructor(router) {
        router.get('/', this.getAll.bind(this));
        router.get('/:id', this.getById.bind(this));
        router.get('/:name', this.getByName.bind(this));
    }

    getAll(req, res) {
        City.find((err, cities) => {
            return util.handleResponse(res, err, cities);
        });
    }

    getById(req, res){
        City.findById(req.params.id, (err, city) => {
            return util.handleResponse(res, err, city);
        })
    }

    getByName(req, res) {
        const query = {
            name: req.params.name
        };
        City.find(query, (err, cities) => {
            return util.handleResponse(res, err, cities);
        });
    }
}

module.exports = CityController;