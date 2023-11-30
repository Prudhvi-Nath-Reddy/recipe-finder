const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.post("/sendrecipe", recipeController.addRecipe);
router.post("/getrecipe", recipeController.getRecipes);

module.exports = router;

