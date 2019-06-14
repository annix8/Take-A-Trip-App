const util = require('../../../util');
const imageRepository = require('../../../repositories/image.repository');

class ImageController {
    constructor(router) {
        router.get('/:id', this.getById.bind(this));
    }

    getById(req, res) {
        imageRepository.getById(req.params.id, (err, image) => {
            return util.handleFileResponse(res, err, image.file);
        });
    }
}

module.exports = ImageController;