const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const { getPosts, getSpecificPost, createNewPost, getNewPostPage } = require('../controllers/PostController');
const { userAuth } = require('../middleware/auth');


router.use(cookieParser());
router.get('/', userAuth, getPosts);
router.get('/newpost', userAuth, getNewPostPage);
router.post('/newpost', userAuth, createNewPost);
router.get('/:id', userAuth, getSpecificPost);



module.exports = router;


