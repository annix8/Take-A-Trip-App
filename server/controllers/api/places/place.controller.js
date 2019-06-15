const placeRepository = require('../../../repositories/place.repository');
const cityRepository = require('../../../repositories/city.repository');
const util = require('../../../util');
const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

class PlaceController {
    constructor(router) {
        router.get('/:id', this.getById.bind(this));
        router.get('/name/:name', this.getByName.bind(this));
        router.post('/create', util.requireJwt.bind(this), upload.any(), this.create.bind(this));
        router.post('/rate/:id/:rating', this.rate.bind(this));
    }

    getById(req, res) {
        placeRepository.getById(req.params.id, (err, place) => {
            return util.handleJsonResponse(res, err, place);
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

    rate(req, res){
        const placeId = req.params.id;
        const rating = req.params.rating;
        placeRepository.rate(placeId, rating, (err, place) =>{
            return util.handleJsonResponse(res, err, place);
        });
    }
}

module.exports = PlaceController;