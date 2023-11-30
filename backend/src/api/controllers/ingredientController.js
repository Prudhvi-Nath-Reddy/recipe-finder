const Ingredient = require('../../models/ingredient.model');

exports.addIngredient = async (req, res) => {
    const { name } = req.body;
    try {
        const newIngredient = new Ingredient({ name });
        await newIngredient.save();
        res.status(200).json(newIngredient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding ingredient" });
    }
};

exports.getIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredient.find({});
        res.json(ingredients.length > 0 ? ingredients : "data not exist");
    } catch (error) {
        console.error(error);
        res.json("data not exist");
    }
};

