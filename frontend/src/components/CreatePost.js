import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation, redirect } from 'react-router-dom';
import axios from 'axios';


export default function CreatePost({ closeCreatePostModal }) {
    const [selectedImage, setSelectedImage] = useState(null); //linkedin
    const [title, setTitle] = useState(''); //linkedin
    const [text, setText] = useState(''); //linkedin
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [isSinglePlatform, setIsSinglePlatform] = useState(false);

    let postTitle = ''; //an empty string for the post title
    const handlePost = async () => {
        if (isSinglePlatform && selectedPlatforms.length === 0) {
            console.error('Please select a platform.');
            return;
        }
        for (const platform of selectedPlatforms) {
            switch (platform) {
                case 'linkedin':
                    postTitle = 'linkedin'; 
                    await handleLinkedInPost(postTitle);
                    break;
                case 'twitter':
                    postTitle = 'twitter';
                    await handlePostTweet(postTitle);
                    break;
                case 'facebook':
                    postTitle = 'facebook'; 
                    await handleFacebookPost(postTitle);
                    break;
                case 'instagram':
                    postTitle = 'instagram'; 
                    await handleInstagramPost(postTitle);
                    break;
                default:
                    console.error(`Unsupported platform: ${platform}`);
            }
        }
    };

    const handleCheckboxChange = (e, platform) => {
        if (e.target.checked) {
            setSelectedPlatforms(prevPlatforms => [...prevPlatforms, platform]);
        } else {
            setSelectedPlatforms(prevPlatforms => prevPlatforms.filter(p => p !== platform));
        }
    };
    const handleSinglePlatformChange = (e) => {
        setIsSinglePlatform(e.target.checked);
    };




    // Twitter
    const handlePostTweet = async (postTitle) => {
        try {
            const userId = localStorage.getItem('twitter_user_id');
            const formData = new FormData();
            formData.append('title', postTitle);
            formData.append('text', text);
            formData.append('userId', userId);
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
            console.log("content shared successfully");
            console.log(JSON.stringify(response.data, undefined, 2));
            // }
        } catch (error) {
            console.error('Error posting tweet:', error);
        }
    };




    //Facebook
    const handleFacebookPost = async (postTitle) => {
  
        try {
            const jwtToken = localStorage.getItem('token');
           
            const formData = new FormData();
            formData.append('title', postTitle);
            formData.append('text', text);
            formData.append('token', jwtToken);
            if (selectedImage) {
              formData.append('image', selectedImage);
            }
        
            // Upload image to ImageBB
            const imageBBApiKey = '8d7d3372506f50dc50891b45144e1bb8';
            const imageBBFormData = new FormData();
            imageBBFormData.append('image', selectedImage);
            
            const imageBBResponse = await axios.post('https://api.imgbb.com/1/upload?key=' + imageBBApiKey, imageBBFormData);
            const imageUrl = imageBBResponse.data.data.url;
        
            // Add image URL to your main form data
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

    //Instagram
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
        
            // Upload image to ImageBB
            const imageBBApiKey = '8d7d3372506f50dc50891b45144e1bb8';
            const imageBBFormData = new FormData();
            imageBBFormData.append('image', selectedImage);
            
            const imageBBResponse = await axios.post('https://api.imgbb.com/1/upload?key=' + imageBBApiKey, imageBBFormData);
            const imageUrl = imageBBResponse.data.data.url;
        
            // Add image URL to your main form data
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


    // LinkedIn
    const handleImageUpload = (event) => {
        setSelectedImage(event.target.files[0]);
    };
    const handleLinkedInPost = async (postTitle) => {
        if (!selectedPlatforms.includes('linkedin')) {
            console.error('Selected platform is not LinkedIn.');
            return;
        }
        try {
            const accessToken = localStorage.getItem('access_token');
            const userId = localStorage.getItem('user_id');

            if (!accessToken || !userId) {
                console.error('Access token or User ID not found.');
                return;
            }
            const formData = new FormData();
            formData.append('title', postTitle);
            formData.append('text', text);
            formData.append('userId', userId);
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
            // alert('Content Shared on linkedin:)');
            console.log('Content shared successfully on LinkedIn:', response.data);
        } catch (error) {
            console.error('Error posting content on LinkedIn:', error);
        }
    };
    //



    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full mx-auto" style={{ maxWidth: '80%', maxHeight: '80vh' }}>
                    <div className="bg-gray-50 px-4 py-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.75 1.75 0 01-3.5 0V5.882M2.807 6.22a1.75 1.75 0 01-.53-.193l-.75-.312m15.44 7.159V19.24a1.75 1.75 0 01-3.5 0V13.382m.53-.193l.75-.312" />
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
                                {/* <label htmlFor="choose-file" className="block text-sm font-medium text-gray-700">
                  Choose File
                </label> */}
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="block text-sm font-medium text-gray-700" /><br />

                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-200 rounded-md cursor-pointer">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-8m32-4v8m0 0v8a4 4 0 01-4 4H0a4 4 0 014-4v-8m-32 4h32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="choose-file" className="relative cursor-pointer bg-white rounded-md font-medium text-sm text-gray-700 hover:text-gray-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                <span>Upload a file</span>
                                                <input id="choose-file" name="choose-file" type="file" className="sr-only" />
                                            </label>
                                            <span className="pl-2">or drag and drop</span>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="post-description" className="block text-sm font-medium text-gray-700">
                                    Post Title
                                </label>
                                <textarea id="post-description" name="post-description" rows="3" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Write a description for your post..." onChange={(e) => setTitle(e.target.value)}></textarea>
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="post-name" className="block text-sm font-medium text-gray-700">
                                    Post Description
                                </label>
                                <input type="text" name="post-name" id="post-name" autocomplete="post-name" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Give your post a name..." onChange={(e) => setText(e.target.value)} />
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="date-picker" className="block text-sm font-medium text-gray-700">
                                    Insert Date
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 00-1-1zm0 18h12V6h-12v12z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <input type="date" name="date-picker" id="date-picker" className="block w-full pl-10 sm:text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Select a date..." />
                                </div>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="choose-media" className="block text-sm font-medium text-gray-700">
                                    Choose Media You Want To Upload On
                                </label>
                                <div className="mt-1 flex items-center">
                                    <input type="checkbox" id="linkedin" value="linkedin" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" checked={selectedPlatforms.includes('linkedin')} onChange={(e) => handleCheckboxChange(e, 'linkedin')} />
                                    <label htmlFor="linkedin" className="ml-3 block text-sm font-medium text-gray-700">
                                        LinkedIn
                                    </label>
                                </div>
                                <div className="mt-1 flex items-center">
                                    <input type="checkbox" id="facebook" value="facebook" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" checked={selectedPlatforms.includes('facebook')} onChange={(e) => handleCheckboxChange(e, 'facebook')} />
                                    <label htmlFor="facebook" className="ml-3 block text-sm font-medium text-gray-700">
                                        Facebook
                                    </label>
                                </div>
                                <div className="mt-1 flex items-center">
                                    <input type="checkbox" id="twitter" value="twitter" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" checked={selectedPlatforms.includes('twitter')} onChange={(e) => handleCheckboxChange(e, 'twitter')} />
                                    <label htmlFor="twitter" className="ml-3 block text-sm font-medium text-gray-700">
                                        Twitter
                                    </label>
                                </div>
                                <div className="mt-1 flex items-center">
                                    <input type="checkbox" id="twitter" value="twitter" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" checked={selectedPlatforms.includes('instagram')} onChange={(e) => handleCheckboxChange(e, 'instagram')} />
                                    <label htmlFor="twitter" className="ml-3 block text-sm font-medium text-gray-700">
                                        Instagram
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:py-4">
                        <div className="flex justify-between">
                            <button type="button" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm" onClick={handlePost}>
                                Post
                            </button>
                            <button type="button" onClick={closeCreatePostModal} className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}