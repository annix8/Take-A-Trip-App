const mongoose = require('mongoose');
const ImageSchema = require('./image');
const Schema = mongoose.Schema;

const placeSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        address: { type: String, required: true, trim: true },
        images: [ImageSchema]
    }
);

module.exports = mongoose.model('Place', placeSchema, 'places');