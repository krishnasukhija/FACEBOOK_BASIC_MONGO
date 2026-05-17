const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        unique: [true, 'Email Address already Exists!'],
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.secondName}`;
});

const User = mongoose.model('User', userSchema);
module.exports = User;

// console.log(User);

