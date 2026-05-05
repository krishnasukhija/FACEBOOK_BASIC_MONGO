const mongoose = require('mongoose');
const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// @desc gets Login page
// @route GET /users/login
// @access Public
const getLoginPage = (req, res) => {
    res.render('users/login', { message: null });
}

//@desc get Signup page
// @route Get /users/signup
// @access Public
const getSignUpPage = (req, res) => {
    res.render('users/signup', { message: null });
}

// @desc login user through Form Submission
// @route POST /users/login
// @access Private
const userLogin = async (req, res) => {
    const { emailId, userPassword } = req.body;
    if (!emailId || !userPassword) {
        return res.status(400).render('users/login', { message: "All Fields Required!" });
    }
    const user = await User.findOne({ emailId });
    if (!user) {
        return res.status(400).render('users/login', { message: "User Login Failed!" });
    }
    try {
        const validPassword = await bcrypt.compare(userPassword, user.userPassword);
        if (!validPassword) {
            return res.status(401).render('users/login', { message: "Invalid Password!" });
        }
        const userPayload = { id: user._id, email: user.emailId };
        const token = await jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.cookie('jwt', token, { httpOnly: true, maxAge: 604800000 });
        res.redirect('/users/user-homepage');
    }
    catch (err) {
        return res.status(400).render('users/login', { message: "User Login Failed!" });
    }
}

// @desc Signup User through Form Submission
// @route POST /users/signup
//@access public
const userSignup = async (req, res) => {
    console.log(req.body);
    const { firstName, secondName, emailId, userPassword } = req.body;
    if (!firstName || !secondName || !emailId || !userPassword) {
        console.log(secondName);
        return res.status(400).render('users/signup', { message: "Please Enter All Fields!" });
    }
    try {
        const user = await User.findOne({ emailId: emailId });
        if (user) {
            return res.status(400).render('users/signup', { message: 'User Already Exists' });
        }
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        const newUser = new User({ firstName, secondName, emailId, userPassword: hashedPassword });
        const response = await newUser.save({ j: true });
        console.log('response', response);
        if (response) {
            res.status(201).redirect('/users/login');
        }
        else {
            res.status(500).render('users/signup', { message: 'User Signup Failed! Please Try Again Later!!' })
        }
    }
    catch (err) {
        console.log("Error");
        res.status(500).render('users/signup', { message: 'User Signup Failed, Please try again later!' });
    }
}

// desc HomePage shows all the actions available to registered user
// @route GET /users/user-homepage
//@access PRIVATE
const getUserHomePage = async (req, res) => {
    if (!req.user) {
        return res.status(401).redirect('/users/login');
    }
    const user = req.user;
    res.render('users/userHomepage', { user });
}

//@desc logout user that have been logged , by removing there JWT token saved on client's browser
// @route GET /users/logout
//@access PRIVATE
const logoutUser = (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/users/login');
}

module.exports = { getLoginPage, getSignUpPage, userLogin, userSignup, getUserHomePage, logoutUser }




