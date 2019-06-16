const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        address: { type: String, required: true, trim: true },
        ratings: [
            {
                rating: { type: Number, default: 0 },
                userId: { type: String }
            }
        ],
        images: [{ _id: { type: Schema.Types.ObjectId, ref: 'Image' }, }]
    }
);

const citySchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        places: [PlaceSchema],
        country: { type: String }
    }
);

module.exports = mongoose.model('City', citySchema, 'cities');