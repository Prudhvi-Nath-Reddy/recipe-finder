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
            "Lentils (dal)",
            "Chickpeas (chana)",
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
            "Ghee (clarified butter)",
            "Yogurt",
            "Fresh cilantro (coriander leaves)",
            "Fresh mint leaves",
            "Fenugreek leaves (kasuri methi)",
            "Paneer (Indian cottage cheese)",
            "Mustard oil",
            "Asafoetida (hing)",
            "Poppy seeds (khus-khus)",
            "Sesame seeds (til)",
            "Jaggery (gur)",
            "Curry powder",
            "Bay leaves",
            "Black pepper",
            "Fennel seeds (saunf)",
            "Tandoori masala",
            "Paprika",
            "Mango powder (amchur)",
            "Coconut oil",
            "Red kidney beans (rajma)",
            "Black gram (urad dal)",
            "Yellow split peas (toor dal)",
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
            "Mustard greens (sarson ka saag)",
            "Gram flour (besan)",
            "Ghee",
            "Raisins",
            "Tandoori masala",
            "Cumin powder",
            "Red onion",
            "Shallots",
            "Cabbage",
            "Okra (bhindi)",
            "Tofu",
            "Mace (javitri)",
            "Ajwain (carom seeds)",
            "Anardana (pomegranate seed powder)",
            "Yellow mustard seeds",
            "White sesame seeds",
            "Chaat masala",
            "Kashmiri red chili powder",
            "Brown cardamom",
            "Coriander leaves (dhania patta)",
            "Mint leaves (pudina)",
            "White pepper",
            "Kala namak (black salt)",
            "Urad dal flour",
            "Curry paste",
            "Whole wheat flour (atta)",
            "Groundnut oil",
            "Rajma masala",
            "Chickpea flour (besan)",
            "Dried fenugreek leaves (kasuri methi)",
            "Chana masala",
            "Nigella seeds (kalonji)",
            "Amchoor (dried mango powder)",
            "Sona masoori rice",
            "Broken wheat (dalia)",
            "Red lentils (masoor dal)",
            "Moong dal",
            "Masala chai",
            "Basa fish",
            "Tamarind paste",
            "Ghee rice",
            "Lemon pickle",
            "Bhindi masala",
            "Aam panna (green mango drink)",
            "Dhokla",
            "Murgh malaiwala (cream chicken)",
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

// // Uncomment the line below if you want to execute the population function.
// populateIngredientDatabase()
//     .then(() => console.log("success"))
//     .catch(err => console.error(err));

module.exports = Ingredient;
