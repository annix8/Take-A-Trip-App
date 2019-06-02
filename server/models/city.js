const mongoose = require('mongoose');
const PlaceSchema = require('./place').schema;
const Schema = mongoose.Schema;

const citySchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        places: [PlaceSchema],
        country: {
            _id: { type: Schema.Types.ObjectId, ref: 'Country' },
            name: { type: String }
        }
    }
);

module.exports = mongoose.model('City', citySchema, 'cities');