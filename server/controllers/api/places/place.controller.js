const placeRepository = require('../../../repositories/place.repository');
const util = require('../../../util');

class PlaceController{
    constructor(router){
        router.get('/', this.getAll.bind(this));
    }

    getAll(req, res){
        placeRepository.get({}, (err, places) =>{
            return util.handleResponse(res, err, places);
        });
    }
}

module.exports = PlaceController;