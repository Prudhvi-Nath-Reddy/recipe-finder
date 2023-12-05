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
    const { username, password ,profileimage2} = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.json("exist");
        } else {
            const newUser = new User({ username, password, profileimage2 });
            await newUser.save();
            res.json("signedup");
        }
    } catch (error) {
        console.error(error);
        res.json("notexist");
    }
};

exports.getprofileimage = async (req,res) => {
    const { username} = req.body;
    try {
        const user = await User.find({username});
        
        const newRecipes = user.map((element) => (element.profileimage2));
        res.json(newRecipes[0])
    } catch (error) {
        console.error(error);
        res.json("data not exist");
    }

}

