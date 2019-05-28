const City = require('../../../models/city');

class CityController {
    constructor(router) {
        router.get('/', this.getAll.bind(this));
        router.get('/:name', this.getByName.bind(this))
    }

    getAll(req, res) {
        City.find((err, cities) => {
            return handleResponse(res, err, cities);
        });
    }

    getByName(req, res) {
        const query = {
            name: req.params.name
        };
        City.find(query, (err, cities) => {
            return handleResponse(res, err, cities);
        });
    }
}

function handleResponse(res, err, data) {
    if (err) {
        return res.send(err);
    }

    return res.json(data);
}

module.exports = CityController;