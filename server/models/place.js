const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        address: { type: String, required: true, trim: true },
        rating: {
            value: { type: Number, default: 0 },
            totalVotes: { type: Number, default: 0 }
        },
        images: [{ _id: { type: Schema.Types.ObjectId, ref: 'Image' }, }]
    }
);

module.exports = mongoose.model('Place', placeSchema, 'places');