'use-strict';

const express = require('express');
const https = require('https');
const accessToken = require('../linkedin_token.json').access_token;
const router = express.Router();

// POST route for posting content on LinkedIn
router.post('/postContent', async (req, res) => {
    console.log('postContent route hit');
    try {
        const { title, text, shareUrl, shareThumbnailUrl } = req.body;
        const ownerId = await getLinkedinId(accessToken);
        console.log(ownerId);
        const response = await postShare(accessToken, ownerId, title, text, shareUrl, shareThumbnailUrl);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error posting content on LinkedIn:', error);
        if (error.response && error.response.data.code === 'DUPLICATE_POST') {
            // Handle duplicate post specifically
            res.status(400).json({ error: 'Duplicate post detected. Please modify the content.' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});


// Get LinkedIn ID of the user
function getLinkedinId(accessToken) {
    console.log('getLinkedinId');
    return new Promise((resolve, reject) => {
        const hostname = 'api.linkedin.com';
        const path = '/v2/me';
        const method = 'GET';
        const headers = {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        };
        const body = '';

        _request(method, hostname, path, headers, body)
           .then(response => {
                resolve(JSON.parse(response.body).id);
            })
           .catch(error => {
                console.error('Error getting LinkedIn ID:', error);
                reject(error);
            });
    });
}

// POST content on LinkedIn
function postShare(accessToken, ownerId, title, text, shareUrl, shareThumbnailUrl) {
    console.log('postShare hit');
    return new Promise((resolve, reject) => {
        const hostname = 'api.linkedin.com';
        const path = '/v2/shares';
        const method = 'POST';
        const body = {
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
        };
        const headers = {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
            'x-li-format': 'json',
            'Content-Length': Buffer.byteLength(JSON.stringify(body))
        };

        _request(method, hostname, path, headers, JSON.stringify(body))
           .then(response => {
                resolve(response);
            })
           .catch(error => {
                console.error('Error posting content on LinkedIn:', error);
                reject(error);
            });
    });
}

// Generic HTTP requester
function _request(method, hostname, path, headers, body) {
    console.log('_request hit');
    return new Promise((resolve, reject) => {
        const reqOpts = {
            method,
            hostname,
            path,
            headers,
            "rejectUnauthorized": false // WARNING: accepting unauthorized endpoints for testing ONLY
        };
        let resBody = "";
        const req = https.request(reqOpts, res => {
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
            console.error('Error in HTTP request:', e);
            reject(e);
        });
        if (method!== 'GET') {
            req.write(body);
        }
        req.end();
    });
}

module.exports = router;
