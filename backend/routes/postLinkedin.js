'use strict';
const moment = require('moment');
const express = require('express');
const https = require('https');
const router = express.Router();
const linkedin = require('../models/Linkedin');
const Post = require('../models/Post');
const multer = require('multer');
const cron = require('node-cron');
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


router.post('/postContent', upload.single('imageFile'), async (req, res) => {
    console.log('postContent route hit');
    try {
        const { title, text, userId, scheduleDate } = req.body;
        const imageFile = req.file;
        const imageURL = req.body.imageURL;

        console.log(title, text, userId, scheduleDate);

        // Validate scheduleDate
        let parsedScheduleDate = null;
        if (scheduleDate) {
            parsedScheduleDate = moment(scheduleDate, 'YYYY-MM-DDTHH:mm:ssZ', true).toDate();
            if (!parsedScheduleDate || isNaN(parsedScheduleDate.getTime())) {
                throw new Error('Invalid date format');
            }
        }

        // Retrieve the LinkedIn access token for the user from the database
        const linkedinToken = await linkedin.findOne({ userId });
        if (!linkedinToken) {
            return res.status(404).send('LinkedIn token not found for user');
        }
        const accessToken = linkedinToken.accessToken;

        // Logging received data for debugging
        console.log('Received title:', title);
        console.log('Received text:', text);
        console.log('Received userID:', userId);
        console.log('Received imageFile:', imageFile);
        console.log('Received imageURL:', imageURL);
        console.log('Received scheduleDate:', scheduleDate);

        const newPost = new Post({
            userID: userId,
            content: text,
            title,
            platforms: ['linkedin'],
            imageURL: imageURL,
            uploadUrl: '',
            scheduledAt: parsedScheduleDate,
            postedAt: null,
            status: scheduleDate ? 'scheduled' : 'draft'
        });

        await newPost.save();

        if (scheduleDate && moment().isBefore(parsedScheduleDate)) {
            console.log('Scheduling post');
            cron.schedule(parsedScheduleDate, async () => {
                try {
                    const ownerId = await getLinkedinId(accessToken);
                    const uploadDetails = await registerImageUpload(accessToken, ownerId, imageFile.path);
                    const imageUrn = uploadDetails.image;
                    const uploadUrl = uploadDetails.uploadUrl;

                    await uploadImageToLinkedIn(uploadUrl, imageFile.path);
                    const response = await postShareWithImage(accessToken, ownerId, title, text, imageUrn);
                    
                    newPost.uploadUrl = uploadUrl;
                    newPost.postedAt = new Date();
                    newPost.status = 'published';
                    await newPost.save();
                    
                    console.log('Content posted and saved to the database.');
                } catch (error) {
                    console.error('Error posting scheduled content:', error);
                }
            });
            res.status(200).json({ message: 'Post scheduled successfully' });
        } else {
            console.log('Posting immediately');
            const ownerId = await getLinkedinId(accessToken);
            const uploadDetails = await registerImageUpload(accessToken, ownerId, imageFile.path);
            const imageUrn = uploadDetails.image;
            const uploadUrl = uploadDetails.uploadUrl;

            await uploadImageToLinkedIn(uploadUrl, imageFile.path);
            const response = await postShareWithImage(accessToken, ownerId, title, text, imageUrn);
            
            newPost.uploadUrl = uploadUrl;
            newPost.postedAt = new Date();
            newPost.status = 'published';
            await newPost.save();
            
            console.log('Content posted and saved to the database.');
            res.status(200).json(response);
        }
    } catch (error) {
        console.error('Error posting content on LinkedIn:', error);
        if (error.response && error.response.data.code === 'DUPLICATE_POST') {
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
            'Content-Type': 'application/json',
            'X-Restli-Protocol-Version': '2.0.0', // Added X-Restli-Protocol-Version header
            'LinkedIn-Version': '202306'
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



const registerImageUpload = async (accessToken, ownerId, imageBuffer) => {
    console.log('Registering image upload');
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            hostname: 'api.linkedin.com',
            path: '/rest/images?action=initializeUpload',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'X-Restli-Protocol-Version': '2.0.0',
                'LinkedIn-Version': '202306'
            },
        };
        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                const responseData = JSON.parse(data);
                resolve(responseData.value);
            });
        });
        req.on('error', (error) => {
            console.error('Error registering image upload:', error);
            reject(error);
        });
        req.write(JSON.stringify({
            "initializeUploadRequest": {
                "owner": `urn:li:person:${ownerId}`
            }
        }));
        req.end();
    });
};


const uploadImageToLinkedIn = async (uploadUrl, imageBuffer) => {
    console.log('Uploading image to LinkedIn');
    return new Promise((resolve, reject) => {
        const req = https.request(uploadUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'image/jpeg', // Adjust this based on your image type
                'Content-Length': imageBuffer.length,
            },
        }, (res) => {
            if (res.statusCode === 201) {
                console.log('Image uploaded successfully');
                resolve();
            } else {
                reject(new Error(`Failed to upload image to LinkedIn. Status code: ${res.statusCode}`));
            }
        });
        req.on('error', (error) => {
            console.error('Error uploading image:', error);
            reject(error);
        });
        req.write(imageBuffer);
        req.end();
    });
};


// Post content on LinkedIn with image
const postShareWithImage = async (accessToken, ownerId, title, text, imageUrn) => {
    console.log('Posting image content on LinkedIn');
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            hostname: 'api.linkedin.com',
            path: '/rest/posts', // Adjusted path based on the LinkedIn documentation
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'X-Restli-Protocol-Version': '2.0.0', // Added X-Restli-Protocol-Version header
                'LinkedIn-Version': '202306' // Add the LinkedIn-Version header
            },
        };
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                const responseData = data;
                resolve(responseData);
            });
        });
        req.on('error', (error) => {
            console.error('Error posting image content on LinkedIn:', error);
            reject(error);
        });
        const requestBody = JSON.stringify({
            "author": `urn:li:person:${ownerId}`, // Adjusted author field based on the LinkedIn documentation
            "commentary": text,
            "visibility": "PUBLIC",
            "distribution": {
                "feedDistribution": "MAIN_FEED",
                "targetEntities": [],
                "thirdPartyDistributionChannels": []
            },
            "content": {
                "media": {
                    "altText": title, // You may want to set this dynamically
                    "id": imageUrn
                }
            },
            "lifecycleState": "PUBLISHED",
            "isReshareDisabledByAuthor": false
        });
        req.write(requestBody);
        req.end();
    });
};


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
        if (method !== 'GET') {
            req.write(body);
        }
        req.end();
    });
}



module.exports = router;
