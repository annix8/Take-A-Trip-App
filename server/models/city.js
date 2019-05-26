const mongoose = require('mongoose');
const PlaceSchema = require('./place');
const Schema = mongoose.Schema;

const citySchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        places: [PlaceSchema]
    }
);

module.exports = mongoose.model('City', citySchema, 'cities');