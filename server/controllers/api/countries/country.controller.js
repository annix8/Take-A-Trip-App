const util = require('../../../util');
const MongooseQueryObject = require('../../../lib/mongoose-query-object');
const Country = require('../../../models/country');
const countryRepository = require('../../../repositories/country.repository');

class CountryController {
    constructor(router) {
        router.get('/', this.getAll.bind(this));
    }

    getAll(req, res) {
        const queryObj = new MongooseQueryObject(
            {},
            util.getExcludeParams(req)
        );
        countryRepository.get(queryObj, (err, city) => {
            return util.handleResponse(res, err, city);
        });
    }
}

module.exports = CountryController;