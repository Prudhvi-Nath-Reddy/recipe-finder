const express = require("express");
const cors = require("cors");
const userRoutes = require('./api/routes/userRoutes');
const ingredientRoutes = require('./api/routes/ingredientRoutes');
const recipeRoutes = require('./api/routes/recipeRoutes');
const app = express();
// const bodyParser = require('body-parser');
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());
// app.use(bodyParser.json({ limit: '1000mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '1000mb' }))
// Routes

app.use(userRoutes);
app.use(ingredientRoutes);
app.use(recipeRoutes);

app.listen(8000, () => {
    console.log("Server running on port 8000");
});

module.exports = app;

