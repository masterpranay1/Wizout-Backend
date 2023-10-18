const express = require('express');
const PostModel=require('../models/postModel');
const {createPost, getALLPosts, getOwnPosts, doUpvote, doDownvote, commetOnPost}=require('../controller/postController');
const { auth } = require('../middleware/auth');

const router = express.Router();
router.route('/new').post(auth,createPost);
router.route('/get/all').get(getALLPosts);
router.route('/get/own').get(auth,getOwnPosts);
router.route('/downvote').post(auth,doDownvote);
router.route('/upvote').post(auth,doUpvote);
router.route('/comment').post(auth,commetOnPost);
module.exports = router;