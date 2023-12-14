const mongoose = require('../config/db');
const logger = require('../utils/logger.js');
const newSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    profileimage2: {
        type: String,
       
    },
});

const User = mongoose.model("user", newSchema);


// Function to populate the database with Users
const populateUsers = async () => {
    try {
        const Userslist = [{
            username:"prr",
            password: "22",
            profileimage2: " ",
        }
        ];

        for (let i = 0; i < Userslist.length; i++) {
            const users = new User(Userslist[i] );
            await users.save();
        }

        console.log('Users added to the database');
    } catch (error) {
        console.error(error);
    }
};

populateUsers()
    .then(() => console.log("success"))
    .catch(err => console.error(err));

// logger.info("intialised user schema")
module.exports = User;

