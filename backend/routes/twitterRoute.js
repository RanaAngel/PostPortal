// Import required modules
require('dotenv').config(); // Load environment variables
const express = require('express');
const crypto = require('crypto'); // Cryptographic library
const Oauth = require('oauth-1.0a'); // OAuth 1.0a library
const qs = require('querystring'); // Query string library
const { URLSearchParams } = require('url'); // URL handling library
const router = express.Router();


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

// SEND THE TWEET
async function writeTweet({ oauth_token, oauth_token_secret }, tweet) {
    const token = {
        key: oauth_token,
        secret: oauth_token_secret
    }

    const url = 'https://api.twitter.com/2/tweets';

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


router.post('/initiate_oauth', async (req, res) => {
  try {
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
      const { oauth_token, oauth_token_secret, pin } = req.body;
      console.log(oauth_token, oauth_token_secret, pin);

      if (!oauth_token ||!oauth_token_secret ||!pin) {
          return res.status(400).send('Missing oauth_token or pin');
      }


      const access_token = await accessToken({oauth_token, oauth_token_secret}, pin.trim());
      console.log(access_token);

      res.json(access_token);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send({ error: 'Internal Server Error' });
  }
});



router.post('/tweet', async (req, res) => {
  try {

      const { text, access_token } = req.body;
      // console.log(oauth_token, oauth_token_secret, text);

      const messageResponse = await writeTweet(access_token, { text});
        console.log(messageResponse);
        res.status(200).json({ message: 'Tweet posted successfully', response: messageResponse });

  } catch (error) {
      console.error('Error posting tweet:', error);
      res.status(500).json({ error: 'Failed to post tweet' });
  }
});

module.exports = router;