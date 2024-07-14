const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Assuming Post model is defined

// Get all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

module.exports = router;