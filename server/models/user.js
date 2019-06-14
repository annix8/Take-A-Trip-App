const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, required: [true, "can't be blank"], index: true },
        email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
        password: { type: String, required: true }
    }
);

module.exports = mongoose.model('User', userSchema, 'users');