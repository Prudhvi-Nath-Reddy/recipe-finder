const User = require('../../models/user.model');
const logger = require('../../utils/logger.js');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    logger.info('Attempting user login for username: ' + username);
    try {
        const user = await User.findOne({ username });
        if (user && user.password === password) {
            logger.info("User logged in !");
            res.json("crctpswd");
        } else {
            logger.warn("Entered wrong password");
            res.json(user ? "wrngpswd" : "notexist");
        }
    } catch (error) {
        logger.error('Login error for username: ' + username + ', Error: ' + error.message);
        console.error(error);
        res.json("notexist");
    }
};

exports.signup = async (req, res) => {
    const { username, password ,profileimage2} = req.body;
    logger.info('Attempting user signup for username: ' + username);

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            logger.warn('Signup attempt for existing username: ' + username);
            res.json("exist");
        } else {
            const newUser = new User({ username, password, profileimage2 });
            await newUser.save();
            logger.info('User signed up successfully: ' + username);

            res.json("signedup");
        }
    } catch (error) {
        logger.error('Signup error for username: ' + username + ', Error: ' + error.message);
        console.error(error);
        res.json("notexist");
    }
};
exports.updatepass = async (req, res) => {
    const { username, password} = req.body;
    logger.info('Attempting to update password for username: ' + username);

    try {
        const user = await User.findOne({ username });

        if (user) {
            await User.updateOne({ username }, { $set: { password: password } });
            logger.info('Password updated successfully for username: ' + username);

            console.log(password)

            res.json('done');
        } else {
            logger.warn('Password update attempted for non-existing username: ' + username);


            res.json('err');
        }
    } catch (error) {
        logger.error('Password update error for username: ' + username + ', Error: ' + error.message);

        res.json('err');
        console.log(error);
    }
};



exports.deleteaccount = async (req, res) => {
    const { username } = req.body;
    logger.info('Attempting to delete account for username: ' + username);

    try {
        const user = await User.findOne({ username });

        if (user) {
            await User.deleteOne({ username });
            logger.info('Account deleted successfully for username: ' + username);

            res.json('done');
        } else {
            logger.warn('Account deletion attempted for non-existing username: ' + username);

            res.json('err');
        }
    } catch (error) {
        logger.error('Account deletion error for username: ' + username + ', Error: ' + error.message);

        res.json('err');
    }
};

exports.getprofileimage = async (req,res) => {
    const { username} = req.body;
    logger.info('Attempting to get profile image for username: ' + username);

    try {
        const user = await User.find({username});
        
        const pimage = user.map((element) => (element.profileimage2));
        logger.info('Profile image retrieved successfully for username: ' + username);

        res.json(pimage[0])
    } catch (error) {
        console.error(error);
        logger.error('Error getting profile image for username: ' + username + ', Error: ' + error.message);

        res.json("data not exist");
    }

}

