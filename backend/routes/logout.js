const axios = require('axios');
const express = require('express');
const router = express.Router();
const Facebook = require('../models/Facebook');
const twitter = require('../models/Twitter')

// Logout from Facebook and delete user data
router.post('/facebooklogout', async (req, res) => {
  try {
    const { userId } = req.body; // Assuming userId is passed in the request body
    console.log(userId);
    
    // Delete the user's record in the Facebook collection
    await Facebook.deleteOne({ userId });
    
    res.status(200).json({ message: 'Logged out from Facebook and user data deleted successfully' });
  } catch (error) {
    console.error('Error logging out from Facebook:', error);
    res.status(500).json({ error: 'Failed to logout from Facebook and delete user data' });
  }
});

// Logout from Twitter and delete user data
router.post('/twitterlogout', async (req, res) => {
  try {
    const { userId } = req.body; // Assuming userId is passed in the request body
    console.log(userId);
    
    // Delete the user's record in the Twitter collection
    await twitter.deleteOne({ userId });
    
    res.status(200).json({ message: 'Logged out from Twitter and user data deleted successfully' });
  } catch (error) {
    console.error('Error logging out from Twitter:', error);
    res.status(500).json({ error: 'Failed to logout from Twitter and delete user data' });
  }
});

  module.exports = router;