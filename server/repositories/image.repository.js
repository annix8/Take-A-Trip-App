const Image = require('../models/image');

class ImageRepository {
    getById(id, callback) {
        Image.findById(id, (err, image) => {
            callback(err, image);
        });
    }

    create(image) {
        const image = new Image(
            {
                file: image
            }
        );

        image.save();

        return image._id;
    }

    createMany(imageData) {
        const imageIds = [];

        for (let i = 0; i < imageData.length; i++) {
            const image = imageData.image;

            const imageId = this.create(image);
            imageIds.push(imageId);
        }

        return imageIds;
    }
}

module.exports = new ImageRepository();