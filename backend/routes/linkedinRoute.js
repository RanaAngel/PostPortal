// backend/routes/linkedinRoute.js
'use-strict';

const express = require('express');
const https = require('https');
const fs = require('fs');
const url = require('url');
const cors = require('cors'); // Import CORS middleware



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

const router = express.Router();

// Enable CORS for all routes
router.use(cors());

router.get('/auth', (req, res) => {
  let auth_url = auth_base_url + '?response_type=' + response_type + '&client_id=' + client_id + '&redirect_uri=' + encodeURIComponent(redirect_uri) + '&state=' + state + '&scope=' + encodeURIComponent(scope);
  
  res.redirect(auth_url);
  console.log('auth hit');
});

router.get('/callback', (req, res) => {
  console.log('callback hit');
  const req_code = req.query.code;
  const req_state = req.query.state;

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

  _request(method, hostname, path, headers, body).then(r => {
    if (r.status === 200) {
      const access_token = JSON.parse(r.body).access_token; 
      const expires_in = Date.now() + (JSON.parse(r.body).expires_in * 1000); // token expiry in epoch format
      token_json = '{"access_token":"' + access_token + '","expires_in":"' + expires_in + '"}';
				fs.writeFile("./linkedin_token.json", token_json, e => {if(e){console.log('ERROR - ' + e)}});

         // Redirect the user to the frontend dashboard with the access token
         res.redirect('http://localhost:3000/dashboard?access_token=' + access_token);
        //  console.log('accessToken'+ access_token);
         console.log("redirected....");

				// res.writeHead(200, {'content-type': 'text/html'});
				// res.write('Access token retrieved. You can close this page');
				// console.log('Access token retrieved. You can stop this app listening.');
				res.end();
     

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


module.exports = router;
