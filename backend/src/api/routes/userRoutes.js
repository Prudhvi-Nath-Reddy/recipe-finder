const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post("/signup", userController.signup);
router.post("/", userController.login);
router.post("/getprofileimage", userController.getprofileimage);
router.post("/updatepass",userController.updatepass)
router.post("/deleteaccount",userController.deleteaccount);

module.exports = router;

