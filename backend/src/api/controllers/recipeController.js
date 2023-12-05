const Recipe = require('../../models/recipe.model');

exports.addRecipe = async (req, res) => {
    const { recipename, selectedIngredients, timeneeded, process, precautions, author } = req.body;
    try {
        const newRecipe = new Recipe({
            recipename: recipename,
            recipeimage: 'https://imgs.search.brave.com/2ymVtaLQRp8rNEaAOjQpJjpvJ2FZu2fOCpdHQv6wheE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzUxLzA3LzI1/LzM2MF9GXzU1MTA3/MjU1OF9yRU51eDlm/cWxlYzVHUEJKU2FU/b1Q2OXhqY1lpR3hq/ZS5qcGc', // replace with actual image URL
            ingredients: selectedIngredients,
            process:process,
            instructions: precautions,
            author:author,
            timeneeded:timeneeded
        });
        await newRecipe.save();
        res.status(200).json(newRecipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding recipe" });
    }
};

exports.getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.json(recipes.length > 0 ? recipes : "data not exist");
    } catch (error) {
        console.error(error);
        res.json("data not exist");
    }
};

    