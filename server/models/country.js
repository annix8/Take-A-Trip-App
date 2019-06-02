const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        cities: [
            {
                _id: { type: Schema.Types.ObjectId, ref: 'City' },
                name: { type: String }
            }
        ]
    }
);

module.exports = mongoose.model('Country', countrySchema, 'countries');