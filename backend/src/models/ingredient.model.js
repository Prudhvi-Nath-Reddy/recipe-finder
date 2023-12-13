const mongoose = require('../config/db');
const logger = require('../utils/logger.js');
const Ingredientschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

const Ingredient = mongoose.model("ingredient", Ingredientschema);
// logger.info("intialised ingredient schema")
module.exports = Ingredient;

