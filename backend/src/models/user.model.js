const mongoose = require('../config/db');

const newSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    profileimage2: {
        type: String,
        required: false,
    },
});

const User = mongoose.model("user", newSchema);

module.exports = User;

