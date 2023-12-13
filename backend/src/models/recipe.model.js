const mongoose = require('../config/db');
const logger = require('../utils/logger.js');
const recipeSchema = new mongoose.Schema({
    recipename: {
        type: String,
        required: true,
    },
    recipeimage: {
        type: [String],
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    process: {
        type: String,
        required: true,
    },
    instructions: {
        type: String,
        required: true,  
    },
    author: {
        type: String,
        required: true,
    },
    timeneeded: {
        type: String,
        required: true,
    }
});

const Recipe = mongoose.model("recipe", recipeSchema);
// logger.info("intialised recipe schema")
module.exports = Recipe;

