// frontend/client/src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [lastActivityTime, setLastActivityTime] = useState(new Date());
  const [tweetText, setTweetText] = useState('');
  const [pin, setPin] = useState('');


  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from local storage

    navigate('/'); // Redirect to Landing page after logout
    window.location.reload(true);
  };

  useEffect(() => {
    // Check if token is available in local storage
    const token = localStorage.getItem('token');
    if (!token) {
      // If token is not available, prompt the user to login again
      alert('Please login again.');
      navigate('/login'); // Redirect to login page
    }
  }, [navigate]);



  // Function to check token expiration after a period of inactivity
  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const currentTime = new Date();
        const timeDifference = currentTime - new Date(lastActivityTime);
        const maxInactiveTime = 10 * 60 * 1000; // 10 minutes in milliseconds

        if (timeDifference > maxInactiveTime) {
          // Token has expired due to inactivity
          localStorage.removeItem('token'); // Clear token from local storage
          navigate('/login'); // Redirect to login page
        }
      }
    };

    // Check token expiration on page load
    checkTokenExpiration();

    // Check token expiration every minute
    const intervalId = setInterval(checkTokenExpiration, 60 * 1000); // Check every minute

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [lastActivityTime, navigate]);





  const handleTweetSubmit = async () => {
    try {
      // Make a request to backend to initiate OAuth flow and obtain request token
      const response = await axios.post('http://localhost:5000/twitter/initiate_oauth');
      const { oauth_token, authorize_url } = response.data;

      // Store the oauth_token in local storage
      localStorage.setItem('oauth_token', oauth_token);

      // Open the authorization URL in a new window or popup
      window.open(authorize_url, '_blank');
    } catch (error) {
      console.error('Error initiating OAuth flow:', error);
    }
  };

  const handlePinSubmit = async () => {
    try {
      // Make a request to backend to validate PIN and obtain access token
      const response = await axios.post('http://localhost:5000/twitter/validate_pin', { oauth_token: localStorage.getItem('oauth_token'), pin });

      // Extract the access token from the response
      const { access_token } = response.data;

      localStorage.setItem('access_token', access_token);

      // Once validated, post the tweet using the obtained access token
      const tweetResponse = await axios.post('http://localhost:5000/twitter/tweet', {
        text: tweetText,
        access_token: access_token
      });

      console.log(tweetResponse.data);
    } catch (error) {
      console.error('Error posting tweet:', error);
    }
  };


   // After initiating OAuth flow, handle the redirect back from Twitter's authorization page
   const handleCallback = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pin = urlParams.get('oauth_verifier');
    if (pin) {
      setPin(pin);
      handlePinSubmit();
    }
  };
  
  useEffect(() => {
    handleCallback();
  }, []);


  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard!</p>
      <textarea
        placeholder="Enter your tweet"
        value={tweetText}
        onChange={(e) => setTweetText(e.target.value)}
      />
      <button onClick={handleTweetSubmit}>Connect to Twitter</button>
      <input type="text" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="Enter PIN" />
      <button onClick={handlePinSubmit}>Submit PIN</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
