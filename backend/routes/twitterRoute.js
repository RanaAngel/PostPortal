require('dotenv').config();
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Oauth = require('oauth-1.0a');
const qs = require('querystring');
const { URLSearchParams } = require('url');
const fetch = require('node-fetch'); // Ensure node-fetch is imported

const requestTokenURL = 'https://api.twitter.com/oauth/request_token?oauth_callback=oob&x_auth_access_type=write';
const authorizeURL = new URL('https://api.twitter.com/oauth/authorize');
const accessTokenURL = 'https://api.twitter.com/oauth/access_token';
const endpointURL = `https://api.twitter.com/2/tweets`;

const oauth = Oauth({
    consumer: {
        key: process.env.CONSUMER_KEY,
        secret: process.env.CONSUMER_SECRET
    },
    signature_method: 'HMAC-SHA1',
    hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
});

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

async function accessToken({ oauth_token, oauth_token_secret }, verifier) {
    console.log('access token function hit');
    try {
        const encodedVerifier = encodeURIComponent(verifier);
        const url = `${accessTokenURL}?oauth_verifier=${encodedVerifier}&oauth_token=${oauth_token}`;

        const authHeader = oauth.toHeader(oauth.authorize({
            url,
            method: 'GET'
        }));

        const request = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: authHeader['Authorization']
            }
        });

        const responseBody = await request.text();
        const parsedBody = Object.fromEntries(new URLSearchParams(responseBody));

        return parsedBody;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function writeTweet({ oauth_token, oauth_token_secret }, tweetText) {
    const token = {
        key: oauth_token,
        secret: oauth_token_secret
    };

    const url = 'https://api.twitter.com/2/tweets';
    const headers = oauth.toHeader(oauth.authorize({
        url,
        method: 'POST'
    }, token));

    console.log('Generated OAuth Header:', headers); // Debugging line

    try {
        const formData = new URLSearchParams();
        formData.append('status', tweetText);

        const requestBody = formData.toString();

        const request = await fetch(url, {
            method: 'POST',
            body: requestBody,
            headers: {
              ...headers,
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'v2CreateTweetJS'
            }
        });

        if (!request.ok) {
            throw new Error(`HTTP error status: ${request.status}`);
        }

        const body = await request.json();
        return body;
    } catch (error) {
        console.error('Error posting tweet:', error);
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

router.post('/callbacks', async (req, res) => {
    try {
        const { oauth_token, oauth_token_secret, pin } = req.body;
        console.log(oauth_token, oauth_token_secret, pin);

        if (!oauth_token ||!oauth_token_secret ||!pin) {
            return res.status(400).send('Missing oauth_token or pin');
        }

        const access_token = await accessToken({oauth_token, oauth_token_secret}, pin.trim());
        console.log(access_token);

        res.json({ oauth_token: access_token.oauth_token, oauth_token_secret: access_token.oauth_token_secret });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.post('/tweet', async (req, res) => {
    try {

        const { text, oauth_token, oauth_token_secret } = req.body;
        console.log(oauth_token, oauth_token_secret, text);

        const tweetResponse = await writeTweet({ oauth_token, oauth_token_secret }, text);

        res.json(tweetResponse);
    } catch (error) {
        console.error('Error posting tweet:', error);
        res.status(500).json({ error: 'Failed to post tweet' });
    }
});

module.exports = router;
