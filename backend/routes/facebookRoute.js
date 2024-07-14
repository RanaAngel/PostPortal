// routes/facebookRoute.js
require('dotenv').config();
const axios = require('axios');
const express = require('express');
const router = express.Router();
const Facebook = require('../models/Facebook');
const atob = require('atob');
const multer = require('multer');
const Post = require('../models/Post');



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


const upload = multer();

router.post('/post', upload.single('image'), async (req, res) => {
  try {
    const { title, text , imageUrl , token } = req.body;
    const userID = getUserIdFromToken(token);
    const image = req.file; // Multer will populate this if 'image' field is in FormData
    const ayrshareApiKey = process.env.AYRSHARE_API_KEY;

    if (!ayrshareApiKey) {
      throw new Error('AYRSHARE_API_KEY is not set in the environment variables.');
    }

    if (!title || !text) {
      throw new Error('Title and text fields are required.');
    }
    // Example of logging the received data
    console.log('Received title:', title);
    console.log('Received text:', text);
    console.log('Received text:', userID);
    // console.log('Received text:', imageUrl);
     
    const postData = {
      post:text,
      platforms: ['facebook'],
      mediaUrls: imageUrl ? [imageUrl] : [],
      // Add more fields as needed
    };

    const response = await axios.post('https://app.ayrshare.com/api/post', postData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ayrshareApiKey}`,
      },
    });
    const ayrsharePostId = response.data.id;

    // Save post details to MongoDB
    const newPost = new Post({
      userID,
      title,
      content: text,
      imageURL: imageUrl,
      platforms: 'facebook',
      ayrsharePostId
    });

    await newPost.save();
    
    res.json(response.data);
  } catch (error) {
    console.error('Error posting content:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error posting content', details: error.response ? error.response.data : error.message });
  }
});


// Get all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

// Function to fetch post analytics from Ayrshare
const getPostAnalytics = async (postId) => {
  const ayrshareApiKey = process.env.AYRSHARE_API_KEY;

  try {
    const response = await axios.get(`https://app.ayrshare.com/api/analytics?postId=${postId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ayrshareApiKey}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching analytics:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch analytics from Ayrshare');
  }
};

// Route to fetch and save post analytics
router.get('/analytics/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    const analyticsData = await getPostAnalytics(postId);

    const userId = getUserIdFromToken(req.headers.authorization.split(' ')[1]);

    const analytics = new Analytics({
      userID: userId,
      postId: postId,
      platform: 'facebook', // Update this with the actual platform if different
      analytics: analyticsData,
    });

    await analytics.save();

    res.json({ message: 'Analytics saved successfully', data: analytics });
  } catch (error) {
    console.error('Error saving analytics:', error);
    res.status(500).json({ error: 'Error saving analytics', message: error.message });
  }
});



module.exports = router;

