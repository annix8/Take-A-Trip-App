const Image = require('../models/image');

class ImageRepository {
    getById(id, callback) {
        Image.findById(id, (err, image) => {
            callback(err, image);
        });
    }
}

module.exports = new ImageRepository();