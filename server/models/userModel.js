
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    username: {type: String, required: true, unique: true}, //only one username
    password: {type: String, required: true},

}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;