const Image = require('../models/image');

class ImageRepository {
    getById(id, callback) {
        Image.findById(id, (err, image) => {
            callback(err, image);
        });
    }

    create(imageFile) {
        const image = new Image(
            {
                file: imageFile
            }
        );

        image.save();

        return image._id;
    }

    createMany(imageData) {
        const imageIds = [];
        for (let i = 0; i < imageData.length; i++) {
            const imageId = this.create(imageData[i].buffer);
            imageIds.push(imageId);
        }

        return imageIds;
    }
}

module.exports = new ImageRepository();