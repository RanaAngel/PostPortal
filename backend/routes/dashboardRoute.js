const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Posts = require('../models/Post');

//Get posts
router.get('/get_post', async(req,res)=>{
    try {
      const posts = await Posts.find();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve Post' }); 
    }
  });
  module.exports = router;
