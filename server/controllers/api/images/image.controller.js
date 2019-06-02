const util = require('../../../util');
const Image = require('../../../models/image');

class ImageController {
    constructor(router) {
        router.get('/:id', this.getById.bind(this));
    }

    getById(req, res) {
        Image.findById(req.params.id, (err, image) => {
            return util.handleFileResponse(res, err, image.file);
        });
    }
}

module.exports = ImageController;