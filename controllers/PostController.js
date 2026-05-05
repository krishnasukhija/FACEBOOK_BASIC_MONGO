const mongoose = require('mongoose');
const Post = require('../model/postModel.cjs');
const User = require('../model/userModel');

//@desc Get All Posts 
//@route GET /posts
//@Private
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ updatedOn: -1 });
        console.log('posts', posts);
        res.status(200).render('posts/index', { posts, message: null });
    }
    catch (err) {
        console.log(err);
        console.log('error playing')
        res.status(500).render('posts/index', { posts: [], message: "An Error Occured Please Try again Later!" })
    }
};

//@desc Gets Specifc Post (where id in Url is a unique post id)
//@route GET /posts:id 
//@Private
const getSpecificPost = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('id', id);
        const post = await Post.findById(id);
        console.log('post', post);
        const userId = post.user;
        console.log('userId', userId);
        const user = await User.findById(userId);
        console.log(user);
        if (user && post) {
            res.status(200).render('posts/selectedPost', { post, user, message: null });
        }
        else {
            res.status(404).render('posts/selectedPost', { post: null, user: null, message: "Post Not Found" });
        }
    }
    catch (err) {
        res.status(404).render('posts/selectedPost', { post: null, user: null, message: "Post Not Found" });
    }
}


//@desc let's the authorised user create a new Post with current date and there unique UserID
//@router POST /posts/newPost
//@Private
const createNewPost = async (req, res) => {
    const { comment } = req.body;
    if (!comment.trim()) {
        return res.status(400).render('posts/newPost', { message: "Please Enter A Valid Comment!" });
    }
    console.log(req.user);
    const user = req.user._id;
    const post = new Post({
        user, comment
    });
    await post.save();
    res.status(201).redirect('/posts');
}


//@desc Get new Post Page
//@router GET /posts/newpost
//@PRIVATE
const getNewPostPage = (req, res) => {
    const user = req.user;
    res.status(200).render('posts/newPost', { message: null });
}

module.exports = { getPosts, getSpecificPost, createNewPost, getNewPostPage };

