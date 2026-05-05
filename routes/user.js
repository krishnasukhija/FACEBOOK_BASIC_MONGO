const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { userAuth } = require('../middleware/auth.js');
const User = require('../model/userModel.js');
const byrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const { getLoginPage, getSignUpPage, userLogin, userSignup, getUserHomePage, logoutUser } = require('../controllers/userController.js');
router.use(cookieParser());

router.get('/user-homepage', userAuth, getUserHomePage);
router.get('/login', getLoginPage);
router.get('/signup', getSignUpPage);
router.get('/logout', userAuth, logoutUser)
router.post('/login', userLogin);
router.post('/signup', userSignup);


module.exports = router;