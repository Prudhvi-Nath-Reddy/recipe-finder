const Recipe = require('../../models/recipe.model');
const logger = require('../../utils/logger.js');

exports.addRecipe = async (req, res) => {
    const { recipename, recipeimage,selectedIngredients, timeneeded, process, precautions, author } = req.body;
    logger.info('Attempting to add recipe: ' + recipename + ' by author: ' + author);

    try {
        const newRecipe = new Recipe({
            recipename: recipename,
            recipeimage: recipeimage, 
            ingredients: selectedIngredients,
            process:process,
            instructions: precautions,
            author:author,
            timeneeded:timeneeded
        });
        await newRecipe.save();
        logger.info('Recipe added successfully: ' + recipename);

        res.json("done");
    } catch (error) {
        console.error(error);
        logger.error('Error adding recipe: ' + recipename + ', Error: ' + error.message);

        res.status(500).json({ message: "Error adding recipe" });
    }
};

exports.getRecipes = async (req, res) => {
    logger.info('Attempting to get all recipes');

    try {
        const recipes = await Recipe.find({});
        if(recipes)
        {
            logger.info('Recipes retrieved successfully');

        }
        else
        {
            logger.warn('No recipe found');
        }
        

        res.json(recipes.length > 0 ? recipes : "data not exist");
    } catch (error) {
        console.error(error);
        logger.error('Error retrieving recipes, Error: ' + error.message);

        res.json("data not exist");
    }
};

    