// backend/routes/linkedinRoute.js
'use-strict';

const express = require('express');
const https = require('https');
const fs = require('fs');
const url = require('url');
const cors = require('cors'); // Import CORS middleware
const mongoose = require('mongoose');
const linkedin = require('../models/Linkedin'); // Import the Linkedin model
const User = require('../models/User');
const jwt = require('jsonwebtoken'); 
const { constants } = require('buffer');



// Load environment variables
require('dotenv').config();

const auth_base_url = process.env.AUTH_BASE_URL;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;
const response_type = 'code';
const state = Math.random(); // WARNING: using weak random value for testing ONLY
const scope = 'openid w_member_social r_basicprofile profile email';

// const options = {
//   key: fs.readFileSync('path/to/localhost.key'),
//   cert: fs.readFileSync('path/to/localhost.crt')
// };


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const router = express.Router();

// Enable CORS for all routes
router.use(cors());

router.get('/auth', (req, res) => {
  const token = req.query.token;
  if (!token) {
    return res.status(401).send('No JWT token provided');
  }
   // Include the token in the state parameter
   const stateWithToken = `${state}:${token}`;

   const auth_url = `${auth_base_url}?response_type=${response_type}&client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${stateWithToken}&scope=${encodeURIComponent(scope)}`;
  
  res.redirect(auth_url);
  console.log('auth hit');
});

router.get('/callback', (req, res) => {
  console.log('callback hit');
 // Extract the JWT token from the query parameters
 const req_code = req.query.code;
 const req_state = req.query.state;
  // Split the state to get the original state and the token
  const [returnedState, token] = req_state.split(':');

  // if (returnedState !== state) {
  //   return res.status(401).send('Invalid state parameter');
  // }

  if (!token) {
    return res.status(401).send('No JWT token provided');
  }



  // WARNING: test req_state == state to prevent CSRF attacks

  const path_query = 
    "grant_type=authorization_code&"+
    "code=" + req_code + "&" +
    "redirect_uri=" + encodeURIComponent(redirect_uri) + "&" + // will redirect here if authentication fails
    "client_id=" + client_id + "&" +
    "client_secret=" + client_secret;

  const method = 'POST';
  const hostname = 'www.linkedin.com';
  const path = '/oauth/v2/accessToken?' + path_query;
  const headers = {
    "Content-Type": "x-www-form-urlencoded"
  };
  const body = '';

  _request(method, hostname, path, headers, body).then(async (r) => {
    if (r.status === 200) {
      const access_token = JSON.parse(r.body).access_token;
      const expires_in = Date.now() + (JSON.parse(r.body).expires_in * 1000); // token expiry in epoch format

      try {
         // Decode the JWT token
    const decoded = jwt.verify(token, 'secretkey');
    const userId = decoded.userId;
    
    // Find the user in your database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }
       // Save the LinkedIn access token to the database, associated with the user
       const linkedinToken = new linkedin({
        accessToken: access_token,
        userId: user._id, // Associate the token with the user
        expiresAt: expires_in,
      });
    await linkedinToken.save();
    console.log(`LinkedIn token saved for user ID: ${user._id}`);

        // Redirect the user to the frontend dashboard with the access token
        res.redirect(`http://localhost:3000/dashboard?access_token=${access_token}&userId=${user._id}`);
        console.log("redirected....");
      } catch (error) {
        console.error('Error saving LinkedIn token:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      console.log('ERROR - ' + r.status + JSON.stringify(r.body));
      res.status(r.status).send(r.status + ' Internal Server Error');
    }
  }).catch(e => {
    console.log('ERROR - ' + e);
    res.status(500).send('500 Internal Server Error');
  });
});


// HTTPS request wrapper  
function _request(method, hostname, path, headers, body) {
  return new Promise((resolve, reject) => {
    let reqOpts = {
      method,
      hostname,
      path,
      headers,
      "rejectUnauthorized": false // WARNING: accepting unauthorized endpoints for testing ONLY
    };
    let resBody = "";
    let req = https.request(reqOpts, res => {
      res.on('data', data => {
        resBody += data.toString('utf8');
      });
      res.on('end', () => {
        resolve({
          "status": res.statusCode,
          "headers": res.headers,
          "body": resBody
        });
      });
    });
    req.on('error', e => {
      reject(e);
    });
    if (method!== 'GET') {
      req.write(body);
    }
    req.end();
  });
}

router.get('/check/:userId', async (req, res) => {
  try {
    const linkedinData = await linkedin.findOne({ userId: req.params.userId });
    if (linkedinData && linkedinData.accessToken) {
      return res.json({ isConnected: true });
    }
    res.json({ isConnected: false });
  } catch (error) {
    console.error('Error checking Twitter connection:', error);
    res.status(500).send('Server Error');
  }
});


module.exports = router;