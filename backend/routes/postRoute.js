// routes/facebookRoute.js
require('dotenv').config();

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');



// Get all posts
router.get('/posts', async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching posts', error });
    }
  });
  // Example Express.js route
  router.get('/posts/:id', async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId); // Adjust based on your model
      if (!post) {
        return res.status(404).send({ message: 'Post not found' });
      }
      res.send(post);
    } catch (error) {
      res.status(500).send({ message: 'Server error' });
  
    }
    
  });
  
  router.delete('/posts/:id', async (req, res) => {
    try {
      const postId = req.params.id;
      const result = await Post.findByIdAndDelete(postId);
      if (!result) {
        return res.status(404).send({ message: 'Post not found' });
      }
      res.send({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error); // Log the full error
      res.status(500).send({ message: 'Server error' });
    }
  });