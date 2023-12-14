const mongoose = require("mongoose");
const mongourl = "mongodb+srv://pru:123@cluster0.rhvlm1b.mongodb.net/recipe"
const mongourl2 = "mongodb://localhost:27017/"
const mongourl3 = "mongodb://mongodb:27017/"

mongoose.connect(mongourl)
    .then(() => {
        console.log("mongodb connected");
    })
    .catch((err) => {
        console.log(err)
        console.log("mongodb connection failed");
    });

module.exports = mongoose;

