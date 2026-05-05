const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async function () {
    try {
        const conn = await mongoose.connect(`${process.env.DATABASE}`);
        // console.log(conn);
        console.log('Succefully connected to MONGODB');
    }
    catch (error) {
        // console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;