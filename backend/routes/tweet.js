const express = require('express');
const router = express.Router();
const Twitter = require('twitter');

// Initialize Twitter client with your API keys and tokens
const client = new Twitter({
  consumer_key: '14BtfXv1Ijs465HO4mk2qhdbU',
  consumer_secret: 'jIQ5bDVQUIMEae5n2Ug3D7nEcNAtfHN56OkvhSMCmj0v8mSgzI',
  access_token_key: '1263757978668134401-TPN5tLEnEqx2jDWPO3PnhLjfVimPLr',
  access_token_secret: 'wwUFUKcFoNw0ndGMfkcOk5qLRdj9YiSSwyWOJJQ90TlWWc'
});

router.get('/auth/twitter', (req, res) => {
  // Use client.getOAuthRequestToken() to get request token
  client.getOAuthRequestToken((error, oauthToken, oauthTokenSecret, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error getting OAuth request token');
    } else {
      // Redirect users to the authorization URL
      res.redirect(`https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}`);
    }
  });
});

router.get('/auth/twitter/callback', (req, res) => {
  const oauthToken = req.query.oauth_token;
  const oauthVerifier = req.query.oauth_verifier;

  // Use client.getOAuthAccessToken() to exchange request token for access token
  client.getOAuthAccessToken(oauthToken, oauthVerifier, (error, accessToken, accessTokenSecret, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error getting OAuth access token');
    } else {
      // Store access token and access token secret in your database
      // You may also want to associate these tokens with the current user

      // Redirect users to a dashboard or home page
      res.redirect('/dashboard');
    }
  });
});

// Route to post a tweet
router.post('/tweet', (req, res) => {
  const tweetText = req.body.text; // Assuming you're passing the tweet text in the request body
  console.log('Received tweet text:', tweetText); // Add this line to check tweet text


  // Use client.post() to post a tweet
  client.post('statuses/update', { status: tweetText }, (error, tweet, response) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error posting tweet');
    } else {
      res.status(200).send('Tweet posted successfully');
    }
  });
});

module.exports = router;
