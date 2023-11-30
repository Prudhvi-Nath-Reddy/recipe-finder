const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://pru:123@cluster0.rhvlm1b.mongodb.net/recipe")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log("mongodb connection failed");
    });

module.exports = mongoose;

