const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    placeId: { type: String },
    placeName: { type: String }
});

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, required: [true, "can't be blank"], index: true },
        email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
        password: { type: String, required: true },
        placesToVisit: [PlaceSchema],
        visitedPlaces: [PlaceSchema],
        favouritePlaces: [PlaceSchema],
        ratedPlaces: [{
            placeId: { type: String },
            placeName: { type: String },
            rating: { type: Number, min: 1, max: 10 }
        }]
    }
);

module.exports = mongoose.model('User', userSchema, 'users');