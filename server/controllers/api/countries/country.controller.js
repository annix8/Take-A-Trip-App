const util = require('../../../util');
const MongooseQueryObject = require('../../../lib/mongoose-query-object');
const Country = require('../../../models/country');

class CountryController {
    constructor(router) {
        router.get('/', this.getAll.bind(this));
    }

    getAll(req, res) {
        Country.find({}, (err, countries) => {
            return util.handleResponse(res, err, countries);
        });
    }
}

module.exports = CountryController;