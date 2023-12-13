const mongoose = require('../config/db');
const logger = require('../utils/logger.js');
const { faker } = require('@faker-js/faker');
const recipeSchema = new mongoose.Schema({
    recipename: {
        type: String,
        required: true,
    },
    recipeimage: {
        type: [String],
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    process: {
        type: String,
        required: true,
    },
    instructions: {
        type: String,
        required: true,  
    },
    author: {
        type: String,
        required: true,
    },
    timeneeded: {
        type: String,
        required: true,
    }
});


const Recipe = mongoose.model("recipe", recipeSchema);





// Function to generate mock data
const generateMockRecipe = () => {
    return new Recipe({
        recipename: faker.lorem.words(3),
        recipeimage: [faker.image.url()],
        ingredients: new Array(5).fill(null).map(() => faker.lorem.word()),
        process: faker.lorem.paragraph(),
        instructions: faker.lorem.paragraph(),
        author: "pruuuuu",
        timeneeded: `10 minutes`
    });
};

// Function to populate the database
const populateDatabase = async () => {
    for (let i = 0; i < 100; i++) {
        const mockRecipe = generateMockRecipe();
        await mockRecipe.save();
    }
    console.log('100 mock recipes added to the database');
};

// Execute the function
populateDatabase()
    .then(() => console.log("success"))
    .catch(err => console.error(err));





// logger.info("intialised recipe schema")


module.exports = Recipe;

