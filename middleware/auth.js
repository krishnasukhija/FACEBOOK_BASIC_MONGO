const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require("../model/userModel");

const userAuth = async function (req, res, next) {
    let token;
    try {
        token = req.cookies.jwt;
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // get user
        req.user = await User.findById(decoded.id).select('-userPassword');
        next();
    }
    catch (err) {
        res.status(401).render('users/login', { message: "User Not Authorised!" });
    }
    if (!token) {
        res.status(401).render('users/login', { message: "User Not Authorised!" });
    }
}

module.exports = { userAuth };