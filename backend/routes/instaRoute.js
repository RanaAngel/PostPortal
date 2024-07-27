const express = require('express');
const router = express.Router();
const axios = require('axios');
const FormData = require('form-data');
const multer = require('multer');
const upload = multer();
const Post = require('../models/Post');
const moment = require('moment');
const cron = require('node-cron');


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

// POST /api/instagram/post endpoint handler
router.post('/post', upload.single('image'), async (req, res) => {
  try {
    const { title,postTitle, text , imageUrl , token ,scheduleDate} = req.body;
    const userID = getUserIdFromToken(token);
    const image = req.file; // Multer will populate this if 'image' field is in FormData
    const ayrshareApiKey = process.env.AYRSHARE_API_KEY;
    const parsedScheduleDate = new Date(scheduleDate);

    if (!ayrshareApiKey) {
      throw new Error('AYRSHARE_API_KEY is not set in the environment variables.');
    }

    if (!title || !text) {
      throw new Error('Title and text fields are required.');
    }

   // Logging received data for debugging
   console.log('Received title:', title);
   console.log('Received text:', text);
   console.log('Received userID:', userID);
   console.log('Received postTitle:', postTitle);
   console.log('Received scheduleDate:', scheduleDate);


    const NewPost = new Post({
      userID: userID,
      content: text,
      title,
      imageURL: imageUrl,
      uploadUrl: '',
      scheduledAt: scheduleDate,
      postedAt: null,
      status: scheduleDate ? 'scheduled' : 'draft'
  });

  await NewPost.save();
     
    const postData = {
      post:text,
      platforms: ['instagram'],
      mediaUrls: imageUrl ? [imageUrl] : [],
      // Add more fields as needed based on Ayrshare API docs for Instagram
    };
    if (scheduleDate && moment().isBefore(moment(scheduleDate))) {
      console.log('if condition');
      const cronTime = moment(scheduleDate).format('m H D M *');
      cron.schedule(cronTime, async () => {
    const response = await axios.post('https://app.ayrshare.com/api/post', postData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ayrshareApiKey}`,
      },
    });
    const ayrsharePostId = response.data.id;

    
  console.log('Content posted and saved to the database.');
  res.json(response.data);

});
 }else {
  console.log('else condition');
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
      platforms: 'instagram',
      ayrsharePostId,
      status : 'published',
      postedAt : Date.now()
    });

    await newPost.save();
  console.log('Content posted and saved to the database.');

 }
 res.status(200).json({ message: 'Post scheduled successfully' });

  } catch (error) {
    console.error('Error posting content:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error posting content', details: error.response ? error.response.data : error.message });
  }
});

module.exports = router;

