const express = require("express");
const cors = require("cors");
const userRoutes = require('./api/routes/userRoutes');
const ingredientRoutes = require('./api/routes/ingredientRoutes');
const recipeRoutes = require('./api/routes/recipeRoutes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use(userRoutes);
app.use(ingredientRoutes);
app.use(recipeRoutes);

app.listen(8000, () => {
    console.log("Server running on port 8000");
});

module.exports = app;

