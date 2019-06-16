const cityRepository = require('../../../repositories/city.repository');
const placeRatingService = require('../../../services/place-rating.service');
const util = require('../../../util');
const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

class PlaceController {
    constructor(router) {
        router.get('/:id', this.getById.bind(this));
        router.post('/create', util.requireJwt.bind(this), upload.any(), this.create.bind(this));
        router.post('/:id/rate/:rating', this.rate.bind(this));
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
        const userId = req.query.userId;
        const cityId = req.query.cityId;

        if (!placeId || !rating || !userId || !cityId) {
            return util.handleJsonResponse(res, { success: false, error: "Rating, placeId, userId, and cityId are required" }, null);
        }

        const rateObj = {
            cityId: cityId,
            userId: userId,
            placeId: placeId,
            rating: rating
        };
        placeRatingService.rate(rateObj, (err, success) => {
            return util.handleJsonResponse(res, err, success);
        });
    }
}

module.exports = PlaceController;