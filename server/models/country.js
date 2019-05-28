const mongoose = require('mongoose');
const CitySchema = require('./city').schema;
const Schema = mongoose.Schema;

const countrySchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        cities: [CitySchema]
    }
);

module.exports = mongoose.model('Country', countrySchema, 'countries');