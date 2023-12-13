const mongoose = require('../config/db');
const logger = require('../utils/logger.js');
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
       
    },
});

const User = mongoose.model("user", newSchema);
// logger.info("intialised user schema")
module.exports = User;

