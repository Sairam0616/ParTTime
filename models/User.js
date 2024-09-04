const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    locality: { type: String, required: true },
    citizenship: { type: String, required: true },
    aadhar: { type: String, required: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);