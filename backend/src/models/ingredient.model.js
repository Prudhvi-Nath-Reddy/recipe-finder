const mongoose = require('../config/db');

const Ingredientschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

const Ingredient = mongoose.model("ingredient", Ingredientschema);

module.exports = Ingredient;

