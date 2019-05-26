const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PlaceSchema = require('./place');

const citySchema = new Schema(
    {
        name: { type: String, required: true },
        places: [PlaceSchema]
    }
);

module.exports = mongoose.model('City', citySchema, 'cities');