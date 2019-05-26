const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CitySchema = require('./city');

const countrySchema = new Schema(
    {
        name: { type: String, required: true },
        cities: [CitySchema]
    }
);

module.exports = mongoose.model('Country', countrySchema, 'countries');