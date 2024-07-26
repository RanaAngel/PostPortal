const express = require('express');
const User = require('../models/User');
const router = express.Router();
const Users = require('../models/User');
// const Contacts = require('../models/Contact');
const Posts = require('../models/Post');


//get all users form database
router.get('/get_users', async (req, res) => {
  try {
    // Find all users except those with the role 'admin'
    const users = await Users.find({ role: { $ne: 'admin' } }); // $ne means 'not equal'
    // console.log(users);
    res.json(users); // Send the data as JSON
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' }); 
  }
});



  // Delete a user by ID
router.delete('/delete_user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await Users.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});


// Update a user by ID
router.put('/update_user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await Users.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});


// Create a new user
router.post('/create_user', async (req, res) => {
  const { firstName, lastName, organizationName, email, phone, password, usertype } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !phone || !password || !usertype) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newUser = new Users({
      firstName,
      lastName,
      organizationName,
      email,
      phone,
      password,
      usertype,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});



  //GET ALL POST
  router.get('/get_post', async(req,res)=>{
    try {
      const posts = await Posts.find();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve Post' }); 
    }
  })



  // Delete a post by ID
router.delete('/delete_post/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Posts.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});
module.exports = router;
