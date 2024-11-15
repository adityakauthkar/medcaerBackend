const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware')
const {registerUser , authUser , getProfile} = require('../controller/userController'); 



router.route('/registerUser').post(registerUser); //registerUser
router.route('/login').post(authUser);            //loginUser
router.route('/profile').get(protect , getProfile)
module.exports = router ; 
