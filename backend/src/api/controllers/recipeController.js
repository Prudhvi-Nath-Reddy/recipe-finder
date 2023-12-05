const Recipe = require('../../models/recipe.model');

exports.addRecipe = async (req, res) => {
    const { recipename, recipeimage,selectedIngredients, timeneeded, process, precautions, author } = req.body;
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

    