const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const errorHandler = require('./middleware/errorMiddleware');



mongoose.connection.on('connected', () => {
    console.log("Mongoose connected");
});

mongoose.connection.on('error', () => {
    console.log(error)
});

connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRouter);
app.use('/posts', postRouter);


app.use(errorHandler);

const port = process.env.PORT || 3000;

// app.listen(port, () => {
//     console.log(`CONNECTED SUCCESSFULLY! ON ${port} `);
// });

module.exports = app;







