import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, redirect } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import axios from 'axios';
import CryptoJS from 'crypto-js';

import FacebookFlow from '../components/FacebookFlow';
import CreatePost from '../components/CreatePost';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [lastActivityTime, setLastActivityTime] = useState(new Date());
  const [tweetText, setTweetText] = useState('');
  const [pin, setPin] = useState('');
  // const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
const [pkceData, setPkceData] = useState({ codeVerifier: '', codeChallenge: '' });


  const [showCreatePost, setShowCreatePost] = useState(false);

  // Login/Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
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



  // // Twitter
  const handleTweetSubmit = async () => {
  // Send the code challenge to your backend to initiate the OAuth flow
    try {
      const response = await axios.post(`http://localhost:5000/twitter/initiate_oauth`);
      const { oauth_token, oauth_token_secret , authorize_url } = response.data;
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
    console.log(oauthToken);
    console.log(pin);


    // Send the PIN and oauth_token to your backend
    const response = await axios.post('http://localhost:5000/twitter/callback', {
      oauth_token: oauthToken,
      oauth_token_secret: oauthTokenSecret,
      pin: pin
    });

    // Handle the response (e.g., store tokens, show success message)
    const AccessToken = response.data;
    localStorage.setItem('access_token', JSON.stringify(AccessToken));

  //    const { oauth_token_secret: AccessTokenSecret} = response.data;
  //    localStorage.setItem('twitter_access_token', AccessToken);
  //    localStorage.setItem('twitter_oauth_token_secret', oauthTokenSecret);
  //   console.log(AccessToken);
  //  console.log(AccessTokenSecret);

   console.log(response.data);
  } catch (error) {
    console.error('Error submitting PIN:', error);
  }
};

const handlePostTweet = async () => {
  try {
  //   const AccessToken = localStorage.getItem('twitter_access_token');
  //   const AccessTokenSecret = localStorage.getItem('twitter_oauth_token_secret');
  //   console.log(AccessToken);
  //  console.log(AccessTokenSecret);

  const storedAccessToken = localStorage.getItem('access_token');
if (storedAccessToken) {
    const accessToken = JSON.parse(storedAccessToken);
    console.log('Retrieved Access Token:', accessToken);
    // Use accessToken.oauth_token and accessToken.oauth_token_secret as needed



    const response = await axios.post('http://localhost:5000/twitter/tweet', {
      text: tweetText,
      access_token: accessToken,
    });
 
    alert("content shared successfully");
    console.log(JSON.stringify(response.data, undefined, 2));
  }
  } catch (error) {
    console.error('Error posting tweet:', error);
  }
};

  // // Effect hook to handle the callback from Twitter
  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const code = searchParams.get('code'); // Extract the authorization code from the URL
  
  //   if (code) {
  //     // Send the code to your backend to exchange for an access token
  //     axios.post('http://localhost:5000/callback', { code })
  //      .then(response => {
  //         // Handle the response, e.g., save the access token locally
  //         localStorage.setItem('access_token', response.data.access_token);
  //         localStorage.setItem('refresh_token', response.data.refresh_token); // Assuming your backend returns a refresh token
  //       })
  //      .catch(error => {
  //         console.error('Error exchanging code for token:', error);
  //       });
  //   }
  // }, [location]);




  // const handlePinSubmit = async () => {
  //   try {
  //     const oauthToken = localStorage.getItem('oauth_token');
  //     const oauthTokenSecret = localStorage.getItem('oauth_token_secret');
  //     const response = await axios.post('http://localhost:5000/twitter/callbacks', {
  //       oauth_token: oauthToken,
  //       oauth_token_secret: oauthTokenSecret,
  //       pin: pin
  //     });
  //     const { oauth_token: AccessToken, oauth_token_secret: AccessTokenSecret } = response.data;
  //     localStorage.setItem('twitter_access_token', AccessToken);
  //     localStorage.setItem('twitter_oauth_token_secret', oauthTokenSecret);
  //   } catch (error) {
  //     console.error('Error submitting PIN:', error);
  //   }
  // };

  // const handlePostTweet = async () => {
  //   try {
  //     const AccessToken = localStorage.getItem('twitter_access_token');
  //     const AccessTokenSecret = localStorage.getItem('twitter_oauth_token_secret');
  //     const response = await axios.post('http://localhost:5000/twitter/tweet', {
  //       text: tweetText,
  //       oauth_token: AccessToken,
  //       oauth_token_secret: AccessTokenSecret,
  //     });
  //     console.log('Content shared successfully:', response.data);
  //   } catch (error) {
  //     console.error('Error posting tweet:', error);
  //   }
  // };

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




      <button onClick={handleLogout}>Logout</button>
      <FacebookFlow />
    </div>
  );
};

export default Dashboard;
