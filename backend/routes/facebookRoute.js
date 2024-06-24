// routes/facebookRoute.js
const express = require('express');
const router = express.Router();
const Facebook = require('../models/Facebook');
const atob = require('atob');

// Middleware to extract user ID from JWT token
const getUserIdFromToken = (token) => {
  if (!token) {
    console.error('JWT token is missing');
    return null;
  }

  try {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    const { userId } = JSON.parse(decodedPayload);
    return userId;
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
};

// POST endpoint to handle tokens from frontend
router.post('/tokens', async (req, res) => {
  const { jwtToken, facebookAccessToken } = req.body;

  console.log('Received POST /tokens request');
  console.log('JWT Token:', jwtToken);
  console.log('Facebook Access Token:', facebookAccessToken);

  if (!jwtToken || !facebookAccessToken) {
    console.error('JWT token and Facebook access token are required');
    return res.status(400).json({ message: 'JWT token and Facebook access token are required' });
  }

  const userId = getUserIdFromToken(jwtToken);

  console.log('Extracted User ID:', userId);

  if (!userId) {
    console.error('Invalid JWT token');
    return res.status(400).json({ message: 'Invalid JWT token' });
  }

  try {
    const facebookEntry = await Facebook.findOneAndUpdate(
      { userId },
      { facebookAccessToken },
      { new: true, upsert: true }
    );

    console.log('Tokens processed successfully');
    res.status(200).json({ message: 'Tokens received and processed successfully' });
  } catch (error) {
    console.error('Error saving tokens to database:', error);
    res.status(500).json({ message: 'Failed to process tokens' });
  }
});

// GET endpoint to retrieve the Facebook access token for a given user
router.get('/tokens', async (req, res) => {
  const jwtToken = req.query.token;

  console.log('Received GET /tokens request');
  console.log('JWT Token:', jwtToken);

  if (!jwtToken) {
    console.error('JWT token is required');
    return res.status(400).json({ message: 'JWT token is required' });
  }

  const userId = getUserIdFromToken(jwtToken);

  console.log('Extracted User ID:', userId);

  if (!userId) {
    console.error('Invalid JWT token');
    return res.status(400).json({ message: 'Invalid JWT token' });
  }

  try {
    const facebookEntry = await Facebook.findOne({ userId });

    if (facebookEntry) {
      console.log('Facebook access token found:', facebookEntry.facebookAccessToken);
      res.status(200).json({ facebookAccessToken: facebookEntry.facebookAccessToken });
    } else {
      console.log('No Facebook access token found for this user');
      res.status(404).json({ message: 'No Facebook access token found for this user' });
    }
  } catch (error) {
    console.error('Error retrieving Facebook access token:', error);
    res.status(500).json({ message: 'Failed to retrieve access token' });
  }
});

module.exports = router;

