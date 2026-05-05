const mongoose = require('mongoose');
require('dotenv').config();


const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    comment: {
        type: String
    },
    updatedOn: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);

const post = new Post({
    user: '69f4d43e0ef6275686463990',
    comment: 'Hope This Works Out'
});

// post.save().then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log("OH NO ERROR!")
//     console.log(err)
// })

module.exports = Post;

// console.log('Working')
