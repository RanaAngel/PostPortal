// frontend/client/src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, redirect } from 'react-router-dom';
import axios from 'axios';
import FacebookFlow from '../components/FacebookFlow';


const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [lastActivityTime, setLastActivityTime] = useState(new Date());
  const [tweetText, setTweetText] = useState('');//twitter
  const [pin, setPin] = useState('');//twitter
  // const [accessToken, setAccessToken] = useState(''); //linkedin
  // const [AccessToken, setaccessToken] = useState('');//twitter
  // const [oauthTokenSecret, setOauthTokenSecret] = useState('');//twitter

 

//LOGIN SIGNIN
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
//










//TWITTER
const handleTweetSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:5000/twitter/initiate_oauth');
    const { oauth_token, oauth_token_secret , authorize_url } = response.data;
  

    localStorage.setItem('oauth_token', oauth_token);
    localStorage.setItem('oauth_token_secret', oauth_token_secret);
    console.log(oauth_token);
    console.log(oauth_token_secret);
    window.open(authorize_url, '_blank');  } catch (error) {
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
    const response = await axios.post('http://localhost:5000/twitter/callbacks', {
      oauth_token: oauthToken,
      oauth_token_secret: oauthTokenSecret,
      pin: pin
    });

    // Handle the response (e.g., store tokens, show success message)
    const { oauth_token: AccessToken } = response.data;
     const { oauth_token_secret: AccessTokenSecret} = response.data;
     localStorage.setItem('twitter_access_token', AccessToken);
     localStorage.setItem('twitter_oauth_token_secret', oauthTokenSecret);
    console.log(AccessToken);
   console.log(AccessTokenSecret);

   console.log(response.data);
  } catch (error) {
    console.error('Error submitting PIN:', error);
  }
};




const handlePostTweet = async () => {
  try {
    const AccessToken = localStorage.getItem('twitter_access_token');
    const AccessTokenSecret = localStorage.getItem('twitter_oauth_token_secret');
    console.log(AccessToken);
   console.log(AccessTokenSecret);


    const response = await axios.post('http://localhost:5000/twitter/tweet', {
      text: tweetText,
      oauth_token: AccessToken,
      oauth_token_secret: AccessTokenSecret,
    });
    console.log("content shared successfully!!");
    console.log(response.data);
  } catch (error) {
    console.error('Error posting tweet:', error);
  }
};
//
















  // LINKEDIN 
  const handleLinkedInAuth = async () => {
    try {
      // Retrieve the JWT token from localStorage
      const token = localStorage.getItem('token'); // Ensure this matches the key used to store the token
      console.log(token);
      if (!token) {
        throw new Error('JWT token not found');
      }
  
      // Append the JWT token to the callback URL
      const authURL = `http://localhost:5000/linkedin/auth?token=${encodeURIComponent(token)}`;
      window.location.href = authURL;
    } catch (error) {
      console.error('Error initiating LinkedIn authentication flow:', error);
    }
  };

// get the access_token form backend and save it to localstorage
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get('access_token');

    if (accessToken) {
      // Access token is retrieved from the query parameters
      console.log('Access token:', accessToken);

      // Example: Store the access token in localStorage
      localStorage.setItem('access_token', accessToken);
      // console.log('localStorageItem  : '+ accessToken);
    } else {
      // Handle error or redirect to login page if access token is not present
      console.error('Access token not found.');
      redirect('/login');
    }
  }, [location]);


  // function to post content on LinkedIn
  const handleLinkedInPost = async () => {
    try {
      // Retrieve the access token from local storage
      const accessToken = localStorage.getItem('access_token');
      // console.log('localStorateGETItme: ' + accessToken)
  
      // Check if the access token exists
      if (!accessToken) {
        console.error('Access token not found.');
        return;
      }

      // Call the LinkedIn API to post content
      const response = await axios.post(
        'http://localhost:5000/sharePost/postContent',
        {
          title: 'linkedin api test!',
          text: 'Hello MERNApp!',
          shareUrl: 'https://www.example.com/content.html',
          shareThumbnailUrl: 'https://www.example.com/image.jpg',
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      console.log('Content shared successfully on LinkedIn:', response.data);
    } catch (error) {
      console.error('Error posting content on LinkedIn:', error);
    }
  };
 // 










//DASHBOARD
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
      <button onClick={handlePostTweet}>  Post on Twitter  </button><br />

      
      <button onClick={handleLinkedInAuth}>  Connect to LinkedIn  </button><br />
       <button onClick={handleLinkedInPost}>  Post on LinkedIn  </button><br />

      <button onClick={handleLogout}>  Logout  </button>
      <FacebookFlow />
    </div>
  );
};
//


export default Dashboard;
