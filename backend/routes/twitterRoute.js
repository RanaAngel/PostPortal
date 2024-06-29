// Import required modules
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


const mongoose = require('mongoose');
const twitter = require('../models/Twitter'); // Import the Linkedin model
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');



// Define storage engine for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


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



async function uploadImage({ oauth_token, oauth_token_secret }, media) {
    const token = {
        key: oauth_token,
        secret: oauth_token_secret
    };
    const url = 'https://upload.twitter.com/1.1/media/upload.json';
    // Create a FormData instance to hold the media file
    const formData = new FormData();
    formData.append('media', media.buffer, {
        filename: 'media',
        contentType: media.mimetype
    });
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




router.post('/tweet', upload.single('image'), async (req, res) => {
    try {
        const { title, text, userId } = req.body;
        const imageFile = req.file; // Get the uploaded file
        console.log(text,title, userId);
        console.log(imageFile);
        // Retrieve the Twitter access token for the user from the database
        const twitterToken = await twitter.findOne({ userId });
        if (!twitterToken) {
            return res.status(404).send('Twitter token not found for user');
        }
        const access_token = JSON.parse(twitterToken.accessToken);
        // Call the uploadImage function to get the media ID
        const mediaId = await uploadImage(access_token, imageFile);
        const mediaIdArray = [mediaId];
        console.log("Image uploaded successfully: ", mediaIdArray);
        // Post the tweet with the image
        const messageResponse = await writeTweet(access_token, text, mediaIdArray);
        const newPost = new Post({
            userID: userId,
            title: title,
            content: text,
            imageURL: imageFile ? imageFile.path : null,
            uploadUrl: mediaId,
            postedAt: new Date()
        });
        // Save the new Post document to the database
        await newPost.save();
        console.log(`Content posted and saved to the database ID: ${userId}.`);
        console.log(messageResponse);
        res.status(200).json({ message: 'Tweet posted successfully', response: messageResponse });
    } catch (error) {
        console.error('Error posting tweet:', error);
        res.status(500).json({ error: 'Failed to post tweet' });
    }
});



module.exports = router;