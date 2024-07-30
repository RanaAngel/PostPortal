// Import required modules
const moment = require('moment');
require('dotenv').config(); // Load environment variables
const express = require('express');
const crypto = require('crypto'); // Cryptographic library
const Oauth = require('oauth-1.0a'); // OAuth 1.0a library
const qs = require('querystring'); // Query string library
const { URLSearchParams } = require('url'); // URL handling library
const router = express.Router();
const multer = require('multer');
const fetch = require('node-fetch');
const FormData = require('form-data');
const cron = require('node-cron');



const mongoose = require('mongoose');
const twitter = require('../models/Twitter'); // Import the Linkedin model
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const { userInfo } = require('os');
const path = require('path');
const fs = require('fs');





// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory to store uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
    }
});

const upload = multer({ storage: storage });




// Create an OAuth 1.0a instance with consumer key and secret
const oauth = Oauth({
    consumer: {
        key: process.env.CONSUMER_KEY,
        secret: process.env.CONSUMER_SECRET
    },
    signature_method: 'HMAC-SHA1',
    hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
});






/**
 * Request Access token from Twitter
 * @returns {Object} Access token and secret
 */
async function requestToken() {
    try {
        const requestTokenURL = 'https://api.twitter.com/oauth/request_token?oauth_callback=oob&x_auth_access_type=write';
        const authHeader = oauth.toHeader(oauth.authorize({
            url: requestTokenURL,
            method: 'POST'
        }));
        const request = await fetch(requestTokenURL, {
            'method': 'POST',
            headers: {
                Authorization: authHeader['Authorization']
            }
        })
        const body = await request.text();
        return Object.fromEntries(new URLSearchParams(body));
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}



// VALIDATE the PIN => User requested action
async function accessToken({ oauth_token, oauth_secret }, verifier) {
    try {
        const url = `https://api.twitter.com/oauth/access_token?oauth_verifier=${verifier}&oauth_token=${oauth_token}`
        const authHeader = oauth.toHeader(oauth.authorize({
            url,
            method: 'POST'
        }));
        const request = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: authHeader['Authorization']
            }
        });
        const body = await request.text();
        return Object.fromEntries(new URLSearchParams(body));
    } catch (error) {
        console.error('Error:', error)
        throw error;
    }
}


async function writeTweet({ oauth_token, oauth_token_secret }, tweetText, mediaIds) {
    const token = {
        key: oauth_token,
        secret: oauth_token_secret
    };
    const url = 'https://api.twitter.com/2/tweets';
    // Ensure mediaIds is an array
    if (!Array.isArray(mediaIds)) {
        throw new Error("mediaIds must be an array.");
    }
    // Prepare the tweet object, including the text and media IDs
    const tweetPayload = {
        text: tweetText,
        media: {
            media_ids: mediaIds // Ensure this is an array of strings
        }
    };
    const headers = oauth.toHeader(oauth.authorize({
        url,
        method: 'POST'
    }, token));
    try {
        const request = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(tweetPayload),
            headers: {
                Authorization: headers['Authorization'],
                'user-agent': 'V2CreateTweetJS',
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        });
        const body = await request.json();
        return body;
    } catch (error) {
        console.error('Error:', error);
    }
}



async function uploadImage({ oauth_token, oauth_token_secret }, imagePath) {
    const token = {
        key: oauth_token,
        secret: oauth_token_secret
    };
       // Read the image file from disk

       const media = fs.createReadStream(imagePath);

       // Create a FormData instance
       const formData = new FormData();
       formData.append('media', media);
    const url = 'https://upload.twitter.com/1.1/media/upload.json';
  
    // Upload the image to get the media ID
    const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
            ...oauth.toHeader(oauth.authorize({ url, method: 'POST' }, token)),
        }
    });
    // Parse the response body as JSON
    const responseBody = await uploadResponse.json();
    console.log(responseBody);
    const mediaId = responseBody.media_id_string;
    return mediaId;
}



//get user ID of twitter
async function getUserId({ oauth_token, oauth_token_secret }) {
    const token = {
        key: oauth_token,
        secret: oauth_token_secret
    };

    const url = 'https://api.twitter.com/1.1/account/verify_credentials.json';
    const headers = oauth.toHeader(oauth.authorize({
        url,
        method: 'GET'
    }, token));

    try {
        const request = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: headers['Authorization'],
                'user-agent': 'v1VerifyCredentialsJS',
                'accept': 'application/json'
            }
        });

        const body = await request.json();
        return body.id_str; // Returns the user ID as a string
    } catch (error) {
        console.error('Error getting user ID:', error);
        return null;
    }
}




router.post('/initiate_oauth', async (req, res) => {
    try {
        const token = req.query.token;
        if (!token) {
            return res.status(401).send('No JWT token provided');
        }
        const request_token = await requestToken();
        const authorizeURL = `https://api.twitter.com/oauth/authorize?oauth_token=${request_token.oauth_token}`;
        res.json({ oauth_token: request_token.oauth_token, oauth_token_secret: request_token.oauth_token_secret, authorize_url: authorizeURL });
    } catch (error) {
        console.error('Error initiating OAuth flow:', error);
        res.status(500).json({ error: 'Failed to initiate OAuth flow' });
    }
});



router.post('/callback', async (req, res) => {

    try {
        const token = req.query.token;
        if (!token) {
            return res.status(401).send('No JWT token provided');
        }
        const { oauth_token, oauth_token_secret, pin } = req.body;
        console.log(oauth_token, oauth_token_secret, pin);

        if (!oauth_token || !oauth_token_secret || !pin) {
            return res.status(400).send('Missing oauth_token or pin');
        }
        const access_token = await accessToken({ oauth_token, oauth_token_secret }, pin.trim());
        const expiresInHours = 1; // Token lifetime in hours
        const expires_at = new Date(Date.now() + (expiresInHours * 60 * 60 * 1000));
        console.log(access_token);
        // Decode the JWT token
        const decoded = jwt.verify(token, 'secretkey');
        const userId = decoded.userId;
        // Find the user in your database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        // Save the LinkedIn access token to the database, associated with the user
        const twitterToken = new twitter({
            accessToken: JSON.stringify(access_token),
            userId: user._id, // Associate the token with the user
            expiresAt: expires_at,
        });
        await twitterToken.save();
        console.log(`LinkedIn token saved for user ID: ${user._id}`);
        res.status(200).json({ access_token, userId });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});





router.post('/tweet', upload.single('imageFile'), async (req, res) => {
    try {
        const { title, postTitle, text, userId, scheduleDate} = req.body;
        const imageFile = req.file;
        const imageURL = req.body.imageURL; // image URL from the 'imageURL' field
        console.log('image url: ',imageFile);
        console.log('imageUrl: ',imageURL);
        const parsedScheduleDate = new Date(scheduleDate);
        console.log('Received title:', title);
        console.log('Received text:', text);
        console.log('Received userID:', userId);
        console.log('Received postTitle:', postTitle);
        console.log('Received scheduleDate:', scheduleDate);
        const twitterToken = await twitter.findOne({ userId });
        if (!twitterToken) {
            return res.status(404).send('Twitter token not found for user');
        }
        const access_token = JSON.parse(twitterToken.accessToken);
        // Logging received data for debugging
   console.log('Received title:', title);
   console.log('Received text:', text);
   console.log('Received userID:', userId);
   console.log('Received postTitle:', postTitle);
   console.log('Received scheduleDate:', scheduleDate);

        const NewPost = new Post({
            userID: userId,
            content: text,
            title,
            name: postTitle,
            platforms: 'twitter',
            imageURL: imageURL,
            uploadUrl: '',
            scheduledAt: parsedScheduleDate,
            postedAt: null,
            status: scheduleDate ? 'scheduled' : 'draft'
        });
        await NewPost.save();
        const mediaId = await uploadImage(access_token, imageFile.path);
        const mediaIdArray = [mediaId];
        console.log("Image uploaded successfully: ", mediaIdArray);
        console.log('scheduleDate:', scheduleDate);

        // Check if scheduleDate is provided and in the future
        if (scheduleDate && moment().isBefore(moment(scheduleDate))) {
            console.log('if condition running');
            const cronTime = moment(scheduleDate).format('m H D M *');
            cron.schedule(cronTime, async () => {
                const messageResponse = await writeTweet(access_token, text, mediaIdArray);
                const tweetId = messageResponse.data.id;
                console.log('tweet id: ', tweetId);
                const tweetData = messageResponse.data.text;
                console.log('tweet data: ', tweetData);
                NewPost.uploadUrl = mediaId;
                NewPost.postedAt = Date.now();
                NewPost.status = 'published';
                console.log('if condition');
                await NewPost.save();
                console.log('Content posted and scheduled to the database.');
            });
            res.status(200).json({ message: 'Post scheduled successfully' });
        } else {
            console.log( 'else condition');
            const messageResponse = await writeTweet(access_token, text, mediaIdArray);
            const tweetId = messageResponse.data.id;
            console.log('tweet id: ', tweetId);
            const tweetData = messageResponse.data.text;
            console.log('tweet data: ', tweetData);
            NewPost.uploadUrl = mediaId;
            NewPost.postedAt = Date.now();
            NewPost.status = 'published';
            await NewPost.save();
            console.log('else condition');

            console.log('Content posted and saved to the database.');
            res.status(200).json({ message: 'Post Shared successfully' });
        }
    } catch (error) {
        console.error('Error posting tweet:', error);
        res.status(500).json({ error: 'Failed to post tweet' });
    }
});
// Endpoint to check Twitter connection status
router.get('/check/:userId', async (req, res) => {
    try {
      const twitterData = await twitter.findOne({ userId: req.params.userId });
      if (twitterData && twitterData.accessToken) {
        return res.json({ isConnected: true });
      }
      res.json({ isConnected: false });
    } catch (error) {
      console.error('Error checking Twitter connection:', error);
      res.status(500).send('Server Error');
    }
  });


  
module.exports = router;