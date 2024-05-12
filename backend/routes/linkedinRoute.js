// backend/routes/linkedinRoute.js
'use-strict';

const express = require('express');
const https = require('https');
const fs = require('fs');
const url = require('url');


// Load environment variables
require('dotenv').config();

const auth_base_url = process.env.AUTH_BASE_URL;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;
const response_type = 'code';
const state = Math.random(); // WARNING: using weak random value for testing ONLY
const scope = 'openid w_member_social profile';

// const options = {
//   key: fs.readFileSync('path/to/localhost.key'),
//   cert: fs.readFileSync('path/to/localhost.crt')
// };

const router = express.Router();

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
      const token_json = '{"access_token":"' + access_token + '","expires_in":"' + expires_in + '"}';
      fs.writeFile("./linkdin_token.json", token_json, e => {if(e){console.log('ERROR - ' + e)}});
      res.send('Access token retrieved. You can close this page');
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



// Publish content on LinkedIn
function postShare(accessToken, ownerId, title, text, shareUrl, shareThumbnailUrl) {
  return new Promise((res, rej) => {
      let hostname = 'api.linkedin.com';
      let path = '/v2/shares';
      let method = 'POST';
      let body = {
          "owner": "urn:li:person:" + ownerId,
          "subject": title,
          "text": {
              "text": text // max 1300 characters
          },
          "content": {
              "contentEntities": [{
                  "entityLocation": shareUrl,
                  "thumbnails": [{
                      "resolvedUrl": shareThumbnailUrl
                  }]
              }],
              "title": title
          },
          "distribution": {
              "linkedInDistributionTarget": {}
          }
      }
      let headers = {
          'Authorization': 'Bearer ' + accessToken,
          'cache-control': 'no-cache',
          'X-Restli-Protocol-Version': '2.0.0',
          'Content-Type': 'application/json',
          'x-li-format': 'json',
          'Content-Length': Buffer.byteLength(JSON.stringify(body))
      };
      _request(method, hostname, path, headers, JSON.stringify(body)).then(r => {
          res(r);
      }).catch(e => rej(e))
  })
}
module.exports = router;
