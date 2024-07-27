
require('dotenv').config();

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


// Get posts by platform and user ID
router.get('/postsview', async (req, res) => {
  const { userId, platform } = req.query; // Access both userId and platform from req.query
  
  try {
    // Filter posts by user ID and platform
    const posts = await Post.find({ userID: userId, platforms: platform });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;