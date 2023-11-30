const User = require('../../models/user.model');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && user.password === password) {
            res.json("crctpswd");
        } else {
            res.json(user ? "wrngpswd" : "notexist");
        }
    } catch (error) {
        console.error(error);
        res.json("notexist");
    }
};

exports.signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.json("exist");
        } else {
            const newUser = new User({ username, password });
            await newUser.save();
            res.json("notexist");
        }
    } catch (error) {
        console.error(error);
        res.json("notexist");
    }
};

