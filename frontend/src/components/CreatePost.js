import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default function CreatePost({ closeCreatePostModal }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [scheduleDate, setScheduleDate] = useState(null);

    const handlePost = async (scheduleDate) => {
        try {
            for (const platform of selectedPlatforms) {
                let postTitle =''; // Default to an empty string if title is not set
                switch (platform) {
                    case 'linkedin':
                        postTitle = 'linkedin'; 
                        await handleLinkedInPost(postTitle, scheduleDate);
                        break;
                    case 'twitter':
                        postTitle = 'twitter'; 
                        await handlePostTweet(postTitle, scheduleDate);
                        break;
                    case 'facebook':
                        postTitle = 'facebook'; 
                        await handleFacebookPost(postTitle, scheduleDate);
                        break;
                    case 'instagram':
                        postTitle = 'instagram'; 
                        await handleInstagramPost(postTitle, scheduleDate);
                        break;
                    default:
                        console.error(`Unsupported platform: ${platform}`);
                }
            }
        } catch (error) {
            console.error('Error posting content:', error);
        }
    };

    const handleCheckboxChange = (e, platform) => {
        if (e.target.checked) {
            setSelectedPlatforms(prevPlatforms => [...prevPlatforms, platform]);
        } else {
            setSelectedPlatforms(prevPlatforms => prevPlatforms.filter(p => p !== platform));
        }
    };

    const handleImageUpload = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handlePostTweet = async (postTitle, scheduleDate) => {
        try {
            const userId = localStorage.getItem('twitter_user_id');
            const formData = new FormData();
            formData.append('title', postTitle);
            formData.append('text', text);
            formData.append('userId', userId);
            formData.append('scheduleDate', scheduleDate);
            if (selectedImage) {
                formData.append('image', selectedImage);
            } else {
                console.error('No image selected');
                return;
            }
            const response = await axios.post('http://localhost:5000/twitter/tweet', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Content shared successfully");
            console.log(JSON.stringify(response.data, undefined, 2));
        } catch (error) {
            console.error('Error posting tweet:', error);
        }
    };

    const handleFacebookPost = async (postTitle, scheduleDate) => {
        try {
            const jwtToken = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('title', postTitle);
            formData.append('text', text);
            formData.append('token', jwtToken);
            if (selectedImage) {
                formData.append('image', selectedImage);
            }

            const imageBBApiKey = '8d7d3372506f50dc50891b45144e1bb8';
            const imageBBFormData = new FormData();
            imageBBFormData.append('image', selectedImage);

            const imageBBResponse = await axios.post('https://api.imgbb.com/1/upload?key=' + imageBBApiKey, imageBBFormData);
            const imageUrl = imageBBResponse.data.data.url;

            formData.append('imageUrl', imageUrl);

            const response = await axios.post('http://localhost:5000/api/facebook/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Post successful:', response.data);
        } catch (error) {
            console.error('Error posting content:', error.response ? error.response.data : error.message);
        }
    };

    const handleInstagramPost = async (postTitle) => {
        try {
            const jwtToken = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('title', title);
            formData.append('text', text);
            formData.append('token', jwtToken);
            if (selectedImage) {
                formData.append('image', selectedImage);
            }

            const imageBBApiKey = '8d7d3372506f50dc50891b45144e1bb8';
            const imageBBFormData = new FormData();
            imageBBFormData.append('image', selectedImage);

            const imageBBResponse = await axios.post('https://api.imgbb.com/1/upload?key=' + imageBBApiKey, imageBBFormData);
            const imageUrl = imageBBResponse.data.data.url;

            formData.append('imageUrl', imageUrl);

            const response = await axios.post('http://localhost:5000/api/instagram/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Post successful:', response.data);
        } catch (error) {
            console.error('Error posting content:', error.response ? error.response.data : error.message);
        }
    };

    const getUserIdFromToken = (token) => {
        if (!token) {
            console.error('JWT token is missing');
            return null;
        }

        try {
            const payloadBase64 = token.split('.')[1];
            const decodedPayload = atob(payloadBase64);
            const { userId } = JSON.parse(decodedPayload);
            return userId;
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            return null;
        }
    };


    const handleLinkedInPost = async (postTitle, scheduleDate) => {
        if (!selectedPlatforms.includes('linkedin')) {
            console.error('Selected platform is not LinkedIn.');
            return;
        }
        try {
            const accessToken = localStorage.getItem('token');
            const userId = getUserIdFromToken(accessToken);

            if (!userId) {
                console.error('Access token or User ID not found.');
                return;
            }
            const formData = new FormData();
            formData.append('title', postTitle);
            formData.append('text', text);
            formData.append('userId', userId);
            formData.append('scheduleDate', scheduleDate);
            if (selectedImage) {
                formData.append('image', selectedImage);
            } else {
                console.error('No image selected');
                return;
            }
            const response = await axios.post(
                'http://localhost:5000/sharePost/postContent',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log('Content shared successfully on LinkedIn:', response.data);
        } catch (error) {
            console.error('Error posting content on LinkedIn:', error);
        }
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full mx-auto" style={{ maxWidth: '80%', maxHeight: '80vh' }}>
                    <div className="bg-gray-50 px-4 py-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.75 1.75 0 01-3.5 0V5.882M2.807 6.22a1.75 1.75 0 01-.53-.193l-.75-.312m15.44 7.159V19.24a1.75 1.75 0 01-3.5 0V13.382m.53-.193l.75-.312" />
                                </svg>
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Create Post
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Fill in the following details to create your post.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white px-4 py-3 sm:p-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="col-span-1">
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="block text-sm font-medium text-gray-700" /><br />
                            </div>
                            <div className="col-span-1">
                                <textarea id="post-description" name="post-description" rows="3" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Write a description for your post..." onChange={(e) => setTitle(e.target.value)}></textarea>
                            </div>
                            <div className="col-span-1">
                                <input type="text" name="post-name" id="post-name" autoComplete="post-name" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Give your post a name..." onChange={(e) => setText(e.target.value)} />
                            </div>
                            <div className="col-span-1">
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 00-1-1zm0 18h12V6h-12v12z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <DatePicker
                                        selected={scheduleDate}
                                        onChange={(date) => setScheduleDate(date)}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        className="block w-full pl-10 sm:text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholderText="Select a date and time..."
                                    />
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="mt-1 flex items-center space-x-4">
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox" onChange={(e) => handleCheckboxChange(e, 'linkedin')} />
                                        <span className="ml-2">LinkedIn</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox" onChange={(e) => handleCheckboxChange(e, 'twitter')} />
                                        <span className="ml-2">Twitter</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox" onChange={(e) => handleCheckboxChange(e, 'facebook')} />
                                        <span className="ml-2">Facebook</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox" onChange={(e) => handleCheckboxChange(e, 'instagram')} />
                                        <span className="ml-2">Instagram</span>
                                    </label>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="mt-4 flex items-center space-x-4">
                                    <button type="button" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm" onClick={() => handlePost(null)}>Post</button>
                                    <button type="button" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm" onClick={() => handlePost(scheduleDate)}>Schedule Post</button>
                                    <button type="button" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:text-sm" onClick={closeCreatePostModal}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
