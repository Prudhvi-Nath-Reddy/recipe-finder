const Ingredient = require('../../models/ingredient.model');
const logger = require('../../utils/logger.js');

exports.addIngredient = async (req, res) => {
    const { name } = req.body;
    logger.info('Attempting to add ingredient: ' + name);

    try {
        const newIngredient = new Ingredient({ name });
        await newIngredient.save();
        logger.info('Ingredient added successfully: ' + name);

        res.status(200).json(newIngredient);
    } catch (error) {
        console.error(error);
        logger.error('Error adding ingredient: ' + name + ', Error: ' + error.message);

        res.status(500).json({ message: "Error adding ingredient" });
    }
};

exports.getIngredients = async (req, res) => {
    logger.info('Attempting to get all ingredients');

    try {
        const ingredients = await Ingredient.find({});
        if(ingredients)
        {
            logger.info('Ingredients retrieved successfully');

        }
        else
        {
            logger.warn('No ingredients found');

        }
        res.json(ingredients.length > 0 ? ingredients : "data not exist");
    } catch (error) {
        console.error(error);
        logger.error('Error retrieving ingredients, Error: ' + error.message);

        res.json("data not exist");
    }
};

