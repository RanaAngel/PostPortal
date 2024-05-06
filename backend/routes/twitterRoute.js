
require('dotenv').config();
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Oauth = require('oauth-1.0a');
const qs = require('querystring');
const { URLSearchParams } = require('url'); 


// const fetch = require('node-fetch');


const requestTokenURL = 'https://api.twitter.com/oauth/request_token?oauth_callback=oob&x_auth_access_type=write';
const authorizeURL = new URL('https://api.twitter.com/oauth/authorize');
const accessTokenURL = 'https://api.twitter.com/oauth/access_token';
const endpointURL = `https://api.twitter.com/2/tweets`;



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
* @returns {Object} Access token and Token secret
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
async function accessToken({ oauth_token, oauth_token_secret }, verifier) {
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



//SEND THE TWEET FUNCTION
async function writeTweet({ oauth_token, oauth_token_secret }, tweet) {
    const token = {
        key: oauth_token,
        secret: oauth_token_secret
    }

    const url = 'https://api.twitter.com/1.1/statuses/update.json';

    const headers = oauth.toHeader(oauth.authorize({
        url,
        method: 'POST'
    }, token));

    try {
        const request = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(tweet),
            responseType: 'json',
            headers: {
                Authorization: headers['Authorization'],
                'user-agent': 'V2CreateTweetJS',
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        })
        const body = await request.json();
        return body;
    } catch (error) {
        console.error('Error:', error)
    }
}


// (async () => {
//     try {
//         // Get request token
//         const oAuthRequestToken = await requestToken();
//         // Get authorization
//         authorizeURL.searchParams.append('oauth_token', oAuthRequestToken.oauth_token);
//         console.log('Please go here and authorize:', authorizeURL.href);
//         const pin = await input('Paste the PIN here: ');
//         // Get the access token
//         const oAuthAccessToken = await accessToken(oAuthRequestToken, pin.trim());
//         // Make the request
//         const response = await getRequest(oAuthAccessToken);
//         console.dir(response, {
//             depth: null
//         });
//     } catch (e) {
//         console.log(e);
//         process.exit(-1);
//     }
//     process.exit();
// })();







// Route to initiate OAuth flow and obtain request token
router.post('/initiate_oauth', async (req, res) => {
    try {
        // Get the request token from Twitter
        const oAuthRequestToken = await requestToken();

        // Get authorization
        authorizeURL.searchParams.append('oauth_token', oAuthRequestToken.oauth_token);

        // Send back the request token and authorization URL to frontend
        res.json({ oauth_token: oAuthRequestToken.oauth_token, authorize_url: authorizeURL });

    } catch (error) {
        console.error('Error initiating OAuth flow:', error);
        res.status(500).json({ error: 'Failed to initiate OAuth flow' });
    }
});


// Route to handle PIN submission and exchange for access token
router.post('/validate_pin', async (req, res) => {
    try {
        const { oauth_token, pin } = req.body;

        // Validate the PIN and get the access token
        const oAuthAccessToken = await accessToken({ oauth_token }, pin);

        // Send back the access token to frontend
        res.json(oAuthAccessToken);
    } catch (error) {
        console.error('Error validating PIN:', error);
        res.status(500).json({ error: 'Failed to validate PIN' });
    }
});



// Route to handle tweet posting
router.post('/tweet', async (req, res) => {
    try {
        const { text, oauth_token } = req.body;

        // Post the tweet using the access token
        const tweetResponse = await writeTweet({ oauth_token }, { text });

        res.json(tweetResponse);
    } catch (error) {
        console.error('Error posting tweet:', error);
        res.status(500).json({ error: 'Failed to post tweet' });
    }
});




//callback route
// Route to handle the OAuth callback from Twitter
router.get('/twitter/callback', async (req, res) => {
    try {
      const { oauth_token, oauth_verifier } = req.query;
      if (!oauth_token ||!oauth_verifier) {
        return res.status(400).send('Missing oauth_token or oauth_verifier');
      }
  
      // Validate the PIN and get the access token
      const oAuthAccessToken = await accessToken({ oauth_token }, oauth_verifier);
  
      // Send back the access token to frontend
      res.json(oAuthAccessToken);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
  




module.exports = router;

