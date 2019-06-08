const placeRepository = require('../../../repositories/place.repository');
const cityRepository = require('../../../repositories/city.repository');
const util = require('../../../util');
const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

class PlaceController {
    constructor(router) {
        router.get('/', this.getAll.bind(this));
        router.get('/:id', this.getById.bind(this));
        router.post('/create', upload.any(), this.create.bind(this));
        router.get('/name/:name', this.getByName.bind(this));
    }

    getAll(req, res) {
        placeRepository.get({}, (err, places) => {
            return util.handleJsonResponse(res, err, places);
        });
    }

    getById(req, res) {
        placeRepository.get({ _id: req.params.id }, (err, places) => {
            return util.handleJsonResponse(res, err, places[0]);
        });
    }

    getByName(req, res) {
        const query = {
            name: { "$regex": req.params.name, "$options": "i" }
        };
        placeRepository.get(query, (err, places) => {
            return util.handleJsonResponse(res, err, places);
        });
    }

    create(req, res){
        // TODO: Validate
        const place = {
            name: req.body.placeName,
            address: req.body.placeAddress,
            cityId: req.body.cityId,
            images: req.files
        };

        const newPlace = placeRepository.create(place);
        cityRepository.addPlace(place.cityId, newPlace, (err, city)=>{
            return util.handleJsonResponse(res, err, {"success": true});
        });
    }
}

module.exports = PlaceController;