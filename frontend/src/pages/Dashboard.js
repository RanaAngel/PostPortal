import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, redirect } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import axios from 'axios';
import FacebookFlow from '../components/FacebookFlow';
import CreatePost from '../components/CreatePost';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [lastActivityTime, setLastActivityTime] = useState(new Date());
  const [tweetText, setTweetText] = useState('');
  const [pin, setPin] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);



  const [showCreatePost, setShowCreatePost] = useState(false);

//Facebook
 

  // Login/Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('facebookAccessToken');
    localStorage.removeItem('fblst_3024191627745885');
    navigate('/');
    window.location.reload(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login again.');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const currentTime = new Date();
        const timeDifference = currentTime - new Date(lastActivityTime);
        const maxInactiveTime = 10 * 60 * 1000; // 10 minutes in milliseconds

        if (timeDifference > maxInactiveTime) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    checkTokenExpiration();
    const intervalId = setInterval(checkTokenExpiration, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [lastActivityTime, navigate]);



//CREATE POST
  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };



  // Twitter
  const handleTweetSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/twitter/initiate_oauth');
      const { oauth_token, oauth_token_secret, authorize_url } = response.data;
      localStorage.setItem('oauth_token', oauth_token);
      localStorage.setItem('oauth_token_secret', oauth_token_secret);
      window.open(authorize_url, '_blank');
    } catch (error) {
      console.error('Error initiating OAuth flow:', error);
    }
  };

  const handlePinSubmit = async () => {
    try {
      const oauthToken = localStorage.getItem('oauth_token');
      const oauthTokenSecret = localStorage.getItem('oauth_token_secret');
      const response = await axios.post('http://localhost:5000/twitter/callbacks', {
        oauth_token: oauthToken,
        oauth_token_secret: oauthTokenSecret,
        pin: pin
      });
      const { oauth_token: AccessToken, oauth_token_secret: AccessTokenSecret } = response.data;
      localStorage.setItem('twitter_access_token', AccessToken);
      localStorage.setItem('twitter_oauth_token_secret', oauthTokenSecret);
    } catch (error) {
      console.error('Error submitting PIN:', error);
    }
  };

  const handlePostTweet = async () => {
    try {
      const AccessToken = localStorage.getItem('twitter_access_token');
      const AccessTokenSecret = localStorage.getItem('twitter_oauth_token_secret');
      const response = await axios.post('http://localhost:5000/twitter/tweet', {
        text: tweetText,
        oauth_token: AccessToken,
        oauth_token_secret: AccessTokenSecret,
      });
      console.log('Content shared successfully:', response.data);
    } catch (error) {
      console.error('Error posting tweet:', error);
    }
  };

  // LinkedIn
  const handleLinkedInAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('JWT token not found');
      }
      const authURL = `http://localhost:5000/linkedin/auth?token=${encodeURIComponent(token)}`;
      window.location.href = authURL;
    } catch (error) {
      console.error('Error initiating LinkedIn authentication flow:', error);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get('access_token');
    const userId = searchParams.get('userId');

    if (accessToken && userId) {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('user_id', userId);
    } else {
      console.error('Access token or User ID not found.');
      redirect('/login');
    }
  }, [location]);

  // const handleImageUpload = (event) => {
  //   setSelectedImage(event.target.files[0]);
  // };

  // const handleLinkedInPost = async () => {
  //   try {
  //     const accessToken = localStorage.getItem('access_token');
  //     const userId = localStorage.getItem('user_id');
  
  //     if (!accessToken || !userId) {
  //       console.error('Access token or User ID not found.');
  //       return;
  //     }
  
  //     const formData = new FormData();
  //     formData.append('title', 'LinkedIn API Test!');
  //     formData.append('text', 'Hello MERNApp!');
  //     formData.append('shareUrl', 'https://www.example.com/content.html');
  //     formData.append('shareThumbnailUrl', 'https://www.example.com/image.jpg');
  //     formData.append('userId', userId);
  //     if (selectedImage) {
  //       formData.append('image', selectedImage);
  //     } else {
  //       console.error('No image selected');
  //       return;
  //     }
  
  //     const response = await axios.post(
  //       'http://localhost:5000/sharePost/postContent',
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       }
  //     );
  //     alert('Content Shared on linkedin:)');
  //     console.log('Content shared successfully on LinkedIn:', response.data);
  //   } catch (error) {
  //     console.error('Error posting content on LinkedIn:', error);
  //   }
  // };
  

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard!</p>

      <button onClick={handleTweetSubmit}>Connect to Twitter</button><br />
      <input
        type="text"
        placeholder="Enter the PIN code here"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />
      <button onClick={handlePinSubmit}>Submit PIN</button><br />

      <textarea
        placeholder="Enter your tweet"
        value={tweetText}
        onChange={(e) => setTweetText(e.target.value)}
      />
      <button onClick={handlePostTweet}>Post on Twitter</button><br />

      
      <button onClick={handleLinkedInAuth}>Connect to LinkedIn</button><br />
{/* Create Post */}
<button onClick={openModal}> Create Post</button><br />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Create Post"
      >
        <CreatePost closeModal={closeModal} />
        </Modal>

    
      {/* <input type="file" accept="image/*" onChange={handleImageUpload} /><br />
      <button onClick={handleLinkedInPost}>Post on LinkedIn</button><br /> */}




      <button onClick={handleLogout}>Logout</button>
      <FacebookFlow/>
      
      
    </div>
  );
};

export default Dashboard;
