const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredientController');

router.post("/ingredient", ingredientController.addIngredient);
router.post("/getingredients", ingredientController.getIngredients);

module.exports = router;

