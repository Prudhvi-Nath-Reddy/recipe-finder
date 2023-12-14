// ingredient.model.js

const mongoose = require('../config/db');
const logger = require('../utils/logger.js');

const IngredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

const Ingredient = mongoose.model("Ingredient", IngredientSchema);

// Function to populate the database with ingredients
const populateIngredientDatabase = async () => {
    try {
        const ingredientList = [
            "Basmati rice",
            "Lentils",
            "Chickpeas",
            "Cumin seeds",
            "Coriander powder",
            "Turmeric powder",
            "Garam masala",
            "Mustard seeds",
            "Curry leaves",
            "Tamarind",
            "Garlic",
            "Ginger",
            "Onions",
            "Tomatoes",
            "Green chilies",
            "Red chili powder",
            "Cardamom",
            "Cinnamon",
            "Cloves",
            "Fenugreek seeds",
            "Cashews",
            "Coconut milk",
            "Ghee",
            "Yogurt",
            "Fresh cilantro",
            "Fresh mint leaves",
            "Fenugreek leaves",
            "Paneer",
            "Mustard oil",
            "Asafoetida",
            "Poppy seeds",
            "Sesame seeds",
            "Jaggery",
            "Curry powder",
            "Bay leaves",
            "Black pepper",
            "Fennel seeds",
            "Tandoori masala",
            "Paprika",
            "Mango powder",
            "Coconut oil",
            "Red kidney beans",
            "Black gram",
            "Yellow split peas",
            "Turmeric leaves",
            "Green cardamom",
            "Nutmeg",
            "Star anise",
            "Pomegranate seeds",
            "Saffron",
            "Almonds",
            "Pistachios",
            "Cashew nuts",
            "Sunflower oil",
            "Mustard greens",
            "Gram flour",
            "Ghee",
            "Raisins",
            "Tandoori masala",
            "Cumin powder",
            "Red onion",
            "Shallots",
            "Cabbage",
            "Okra",
            "Tofu",
            "Mace",
            "Ajwain",
            "Anardana",
            "Yellow mustard seeds",
            "White sesame seeds",
            "Chaat masala",
            "Kashmiri red chili powder",
            "Brown cardamom",
            "Coriander leaves",
            "Mint leaves",
            "White pepper",
            "Kala namak",
            "Urad dal flour",
            "Curry paste",
            "Whole wheat flour",
            "Groundnut oil",
            "Rajma masala",
            "Chickpea flour",
            "Dried fenugreek leaves",
            "Chana masala",
            "Nigella seeds",
            "Amchoor",
            "Sona masoori rice",
            "Broken wheat",
            "Red lentils",
            "Moong dal",
            "Masala chai",
            "Basa fish",
            "Tamarind paste",
            "Ghee rice",
            "Lemon pickle",
            "Bhindi masala",
            "Aam panna",
            "Dhokla",
            "Murgh malaiwala",
            "chicken"
        ];

        for (let i = 0; i < ingredientList.length; i++) {
            const ingredient = new Ingredient({ name: ingredientList[i] });
            await ingredient.save();
        }

        console.log('Ingredients added to the database');
    } catch (error) {
        console.error(error);
    }
};

// Uncomment the line below if you want to execute the population function.
populateIngredientDatabase()
    .then(() => console.log("success"))
    .catch(err => console.error(err));

module.exports = Ingredient;
