const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CityAndPlacesSchema = new Schema({
    city: {
        id: { type: String },
        name: { type: String },
        places: [
            {
                id: { type: String },
                name: { type: String }
            }
        ]
    }
});

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, required: [true, "can't be blank"], index: true },
        email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
        password: { type: String, required: true },
        placesToVisit: [CityAndPlacesSchema],
        visitedPlaces: [CityAndPlacesSchema],
        favouritePlaces: [CityAndPlacesSchema],
        ratedPlaces: [{
            city: {
                id: { type: String },
                name: { type: String },
                places: [
                    {
                        id: { type: String },
                        name: { type: String },
                        givenRating: { type: Number }
                    }
                ]
            }
        }]
    }
);

module.exports = mongoose.model('User', userSchema, 'users');