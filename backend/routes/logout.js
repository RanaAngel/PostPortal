const axios = require('axios');
const express = require('express');
const router = express.Router();
const Facebook = require('../models/Facebook');
const twitter = require('../models/Twitter')

router.post('/facebooklogout', async (req, res) => {
    try {
      const { userId } = req.body; // Assuming userId is passed in the request body
      // Update the user's record in the database to remove the access token]
      console.log(userId);
      await Facebook.updateOne({ userId }, { $unset: { facebookAccessToken: '' } });
      res.status(200).json({ message: 'Logged out from Facebook successfully' });
    } catch (error) {
      console.error('Error logging out from Facebook:', error);
      res.status(500).json({ error: 'Failed to logout from Facebook' });
    }
  });

  router.post('/twitterlogout', async (req, res) => {
    try {
      const { userId } = req.body; // Assuming userId is passed in the request body
      // Update the user's record in the database to remove the access token
      console.log(userId);
      await twitter.updateOne({ userId }, { $unset: { accessToken: '' } });
      res.status(200).json({ message: 'Logged out from Twitter successfully' });
    } catch (error) {
      console.error('Error logging out from Twitter:', error);
      res.status(500).json({ error: 'Failed to logout from Twitter' });
    }

  });
  module.exports = router;