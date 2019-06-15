const cityRepository = require('../../../repositories/city.repository');
const util = require('../../../util');
const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

class PlaceController {
    constructor(router) {
        router.get('/:id', this.getById.bind(this));
        router.post('/create', util.requireJwt.bind(this), upload.any(), this.create.bind(this));
        router.post('/rate/:id/:rating', this.rate.bind(this));
    }

    getById(req, res) {
        cityRepository.getPlaceById(req.params.id, (err, place) => {
            return util.handleJsonResponse(res, err, place);
        });
    }

    create(req, res) {
        // TODO: Validate
        const place = {
            name: req.body.placeName,
            address: req.body.placeAddress,
            cityId: req.body.cityId,
            images: req.files
        };

        cityRepository.createPlace(place, (err, city) => {
            return util.handleJsonResponse(res, err, { "success": true });
        });
    }

    rate(req, res) {
        const placeId = req.params.id;
        const rating = req.params.rating;
        return util.handleJsonResponse(res, null, {message: "not implemented"})
    }
}

module.exports = PlaceController;