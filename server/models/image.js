const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema(
    {
        file: { type: Buffer, contentType: String }
    }
);

module.exports = mongoose.model('Image', imageSchema, 'images');