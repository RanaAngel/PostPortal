'use strict';
const moment = require('moment');
const express = require('express');
const https = require('https');
const router = express.Router();
const linkedin = require('../models/Linkedin');
const Post = require('../models/Post');
const multer = require('multer');
const cron = require('node-cron');
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes

const upload = multer({ storage: storage });


// POST route for posting content on LinkedIn
router.post('/postContent', upload.single('imageFile'), async (req, res) => {
    console.log('postContent route hit');
    try {
        const { title, text, userId, scheduleDate } = req.body;
<<<<<<< Updated upstream
        const imageFile = req.file; // Get the uploaded file
        console.log(title, text, userId, scheduleDate);
=======
        const imageFile = req.file;
        const imageURL = req.body.imageURL;
        console.log(title, text, userId, scheduleDate);
        const parsedScheduleDate = new Date(scheduleDate);

>>>>>>> Stashed changes
        // Retrieve the LinkedIn access token for the user from the database
        const linkedinToken = await linkedin.findOne({ userId });
        if (!linkedinToken) {
            return res.status(404).send('LinkedIn token not found for user');
        }
        const accessToken = linkedinToken.accessToken;

        const NewPost = new Post({
            userID: userId,
            content: text,
            title,
<<<<<<< Updated upstream
            imageURL: '',
            uploadUrl: '',
            scheduledAt: scheduleDate ? new Date(scheduleDate) : null,
=======
            platforms: ['linkedin'],
            imageURL: imageURL,
            uploadUrl: '',
            scheduledAt: parsedScheduleDate,
>>>>>>> Stashed changes
            postedAt: null,
            status: scheduleDate ? 'scheduled' : 'draft'
        });

        await NewPost.save();

        let formattedDate = moment(scheduleDate, 'MMM DD, YYYY HH:mm:ss', true).format();
        // if (!formattedDate) {
        //     throw new Error('Invalid date format');
        // }

<<<<<<< Updated upstream
        if (scheduleDate) {
            const cronTime = moment(scheduleDate).format('m H D M *');
            cron.schedule(cronTime, async () => {
                const ownerId = await getLinkedinId(accessToken);
                const uploadDetails = await registerImageUpload(accessToken, ownerId, imageFile.buffer);
                console.log(JSON.stringify(uploadDetails, null, 2));
                const imageUrn = uploadDetails.image;
                const uploadUrl = uploadDetails.uploadUrl;
                const imageBuffer = imageFile.buffer;
                await uploadImageToLinkedIn(uploadUrl, imageBuffer);
                console.log('image uploaded: ', uploadImageToLinkedIn);
                const response = await postShareWithImage(accessToken, ownerId, title, text, imageUrn);
                NewPost.imageURL = imageUrn;
                NewPost.uploadUrl = uploadUrl;
                NewPost.postedAt = Date.now();
                NewPost.status = 'posted';
=======
        if (scheduleDate && moment().isBefore(moment(scheduleDate))) {
            console.log('if condition');
            const cronTime = moment(scheduleDate).format('m H D M *');
            cron.schedule(cronTime, async () => {
                const ownerId = await getLinkedinId(accessToken);
                const uploadDetails = await registerImageUpload(accessToken, ownerId, imageFile.path);
                console.log(JSON.stringify(uploadDetails, null, 2));
                const imageUrn = uploadDetails.image;
                const uploadUrl = uploadDetails.uploadUrl;
                const imageBuffer = imageFile.path;
                await uploadImageToLinkedIn(uploadUrl, imageBuffer);
                console.log('image uploaded: ', uploadImageToLinkedIn);
                const response = await postShareWithImage(accessToken, ownerId, title, text, imageUrn);
                NewPost.uploadUrl = uploadUrl;
                NewPost.postedAt = Date.now();
                NewPost.status = 'published';
>>>>>>> Stashed changes
                await NewPost.save();
                console.log('Content posted and saved to the database.');
            });
            res.status(200).json({ message: 'Post scheduled successfully' });
        } else {
<<<<<<< Updated upstream
            const ownerId = await getLinkedinId(accessToken);
            const uploadDetails = await registerImageUpload(accessToken, ownerId, imageFile.buffer);
            console.log(JSON.stringify(uploadDetails, null, 2));
            const imageUrn = uploadDetails.image;
            const uploadUrl = uploadDetails.uploadUrl;
            const imageBuffer = imageFile.buffer;
            await uploadImageToLinkedIn(uploadUrl, imageBuffer);
            console.log('image uploaded: ', uploadImageToLinkedIn);
            const response = await postShareWithImage(accessToken, ownerId, title, text, imageUrn);
            NewPost.imageURL = imageUrn;
            NewPost.uploadUrl = uploadUrl;
            NewPost.postedAt = Date.now();
            NewPost.status = 'posted';
=======
            console.log('else condition');
            const ownerId = await getLinkedinId(accessToken);
            const uploadDetails = await registerImageUpload(accessToken, ownerId, imageFile.path);
            console.log(JSON.stringify(uploadDetails, null, 2));
            const imageUrn = uploadDetails.image;
            const uploadUrl = uploadDetails.uploadUrl;
            const imageBuffer = imageFile.path;
            await uploadImageToLinkedIn(uploadUrl, imageBuffer);
            console.log('image uploaded: ', uploadImageToLinkedIn);
            const response = await postShareWithImage(accessToken, ownerId, title, text, imageUrn);
            NewPost.uploadUrl = uploadUrl;
            NewPost.postedAt = Date.now();
            NewPost.status = 'published';
>>>>>>> Stashed changes
            await NewPost.save();
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





<<<<<<< Updated upstream
// Get image from LinkedIn
router.get('/getImage', async (req, res) => {
    console.log('getImage route hit');
    try {
        const { imageUrn, userId } = req.query;

        // Retrieve the LinkedIn access token for the user from the database
        const linkedinToken = await linkedin.findOne({ userId });
        if (!linkedinToken) {
            return res.status(404).send('LinkedIn token not found for image');
        }
        const accessToken = linkedinToken.accessToken;

        // URL encode the URN
        const encodedUrn = encodeURIComponent(imageUrn);
        // console.log(`Encoded URN: ${encodedUrn}`);

        // Construct the options for the HTTPS request
        const options = {
            hostname: 'api.linkedin.com',
            path: `/rest/images/${encodedUrn}`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'X-Restli-Protocol-Version': '2.0.0',
                'LinkedIn-Version': '202306'
            }
        };

        // Make the HTTPS request
        const request = https.request(options, (response) => {
            let data = '';

            // A chunk of data has been received
            response.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received
            response.on('end', () => {
                // console.log('Response data:', data);
                const responseData = JSON.parse(data);
                if (responseData.downloadUrl) {
                    res.status(200).json({ imageUrl: responseData.downloadUrl });
                } else {
                    res.status(404).json({ error: 'Image not found on LinkedIn' });
                }
            });
        });

        // Handle errors in the HTTPS request
        request.on('error', (error) => {
            console.error('Error retrieving image from LinkedIn:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });

        // End the request
        request.end();
    } catch (error) {
        console.error('Error retrieving image from LinkedIn:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



=======
>>>>>>> Stashed changes


module.exports = router;
