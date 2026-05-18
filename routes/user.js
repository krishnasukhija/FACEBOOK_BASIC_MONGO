const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { userAuth } = require('../middleware/auth.js');
const User = require('../model/userModel.js');
const byrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const formidableMiddleware = require('express-formidable');

// router.use(cors());
// app.use(formidableMiddleware());

// const formDataParser = () => {
//     formidableMiddleware();
//     next();
// }

const { getLoginPage, getSignUpPage, userLogin, userSignup, getUserHomePage, logoutUser, getSalt } = require('../controllers/userController.js');

router.get('/user-homepage', userAuth, getUserHomePage);
router.get('/login', getLoginPage);
router.get('/signup', getSignUpPage);
router.get('/logout', userAuth, logoutUser);
router.post('/login', userLogin);
router.post('/login/salt', getSalt);
router.post('/signup', userSignup);


module.exports = router;