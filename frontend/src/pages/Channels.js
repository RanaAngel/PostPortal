import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useNavigate, useLocation, redirect } from 'react-router-dom';

const Channels = () => {
  const [isFacebookConnected, setIsFacebookConnected] = useState(false);
  const [pin, setPin] = useState('');
  const [isTwitterConnected, setIsTwitterConnected] = useState(false);
  const [isLinkedInConnected, setIsLinkedInConnected] = useState(false);
  const [pinSubmitted, setPinSubmitted] = useState(false);
  
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

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

  useEffect(() => {
    // Function to fetch user connection status
    const fetchConnectionStatus = async () => {
      try {
        const userId = getUserIdFromToken(token);
        
        // Check Facebook connection
        const facebookResponse = await axios.get(`http://localhost:5000/api/facebook/check/${userId}`);
        if (facebookResponse.data.isConnected) {
          setIsFacebookConnected(true);
        }

        // Check Twitter connection
        const twitterResponse = await axios.get(`http://localhost:5000/twitter/check/${userId}`);
        if (twitterResponse.data.isConnected) {
          setIsTwitterConnected(true);
          setPinSubmitted(true); // Ensure we show "Connected" if already connected
        }
         // Check LinkedIn connection
         const linkedInResponse = await axios.get(`http://localhost:5000/linkedin/check/${userId}`);
         console.log('LinkedIn response:', linkedInResponse.data); // Debugging statement
         if (linkedInResponse.data.isConnected) {
         
           setIsLinkedInConnected(true);
         }
      } catch (error) {
        console.error('Error fetching connection status:', error);
      }
    };

    fetchConnectionStatus();
  }, []);
  

  const handleTweetSubmit = async () => {
   
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('JWT token not found');
      }
      const response = await axios.post(`http://localhost:5000/twitter/initiate_oauth?token=${encodeURIComponent(token)}`);
      const { oauth_token, oauth_token_secret, authorize_url } = response.data;
      localStorage.setItem('oauth_token', oauth_token);
      localStorage.setItem('oauth_token_secret', oauth_token_secret);
      window.open(authorize_url, '_blank');
      setPinSubmitted(true); // Show the input and submit button
    } catch (error) {
      console.error('Error initiating OAuth flow:', error);
    }
  };

  const handlePinSubmit = async () => {
   
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('JWT token not found');
      }
      const oauthToken = localStorage.getItem('oauth_token');
      const oauthTokenSecret = localStorage.getItem('oauth_token_secret');
      console.log(oauthToken);
      console.log(pin);
      const response = await axios.post(`http://localhost:5000/twitter/callback?token=${encodeURIComponent(token)}`, {
        oauth_token: oauthToken,
        oauth_token_secret: oauthTokenSecret,
        pin: pin
      });

      const { AccessToken, userId } = response.data;
      localStorage.setItem('access_token', JSON.stringify(AccessToken));
      localStorage.setItem('twitter_user_id', userId);
      console.log(response.data);
      // Update state to reflect successful connection
      setIsTwitterConnected(true);
      setPinSubmitted(false); // Hide PIN input and submit button after success
    } catch (error) {
      console.error('Error submitting PIN:', error);
    }
   
  };

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


//FacebookFlow
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [sdkLoaded, setSdkLoaded] = useState(false);

useEffect(() => {
  const loadFacebookSDK = () => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '3024191627745885', // Replace with your Facebook App ID
        cookie: true,
        xfbml: true,
        version: 'v19.0'
      });

      window.FB.AppEvents.logPageView();
      setSdkLoaded(true);
    };

    // Load the Facebook SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  };

  // Check if FB SDK is already loaded
  if (window.FB) {
    setSdkLoaded(true);
  } else {
    loadFacebookSDK();
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

useEffect(() => {
  if (sdkLoaded) {
    checkFacebookConnection();
  }
}, [sdkLoaded]);

const checkFacebookConnection = async () => {
  console.log('Checking Facebook connection...');
  try {
    const response = await fetch(`http://localhost:5000/api/facebook/tokens?token=${localStorage.getItem('token')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      if (response.status === 404) {
        console.log('No Facebook access token found');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } else {
      const data = await response.json();
      

      if (data.facebookAccessToken) {
       
        localStorage.setItem('facebookAccessToken', data.facebookAccessToken);
        setIsLoggedIn(true);
      } else {
        console.log('No Facebook access token in response data');
        initiateFacebookLogin();
      }
    }
  } catch (error) {
    console.error('Error checking Facebook connection:', error);
    initiateFacebookLogin();
  }
};

const initiateFacebookLogin = () => {
  if (!window.FB) {
    console.error('Facebook SDK not loaded');
    return;
  }

  window.FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      const facebookAccessToken = response.authResponse.accessToken;
      localStorage.setItem('facebookAccessToken', facebookAccessToken);
      setIsLoggedIn(true);
      sendTokensToBackend(facebookAccessToken);
    } else {
      setIsLoggedIn(false);
    }
  });
};

const doLogin = () => {
  if (sdkLoaded && window.FB) {
    window.FB.login(function (response) {
      if (response.status === "connected") {
        const facebookAccessToken = response.authResponse.accessToken;
        localStorage.setItem('facebookAccessToken', facebookAccessToken);
        setIsLoggedIn(true);
        sendTokensToBackend(facebookAccessToken);
        window.location.reload();
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'email,public_profile,pages_show_list,instagram_basic,pages_read_engagement,read_insights,ads_read,instagram_manage_insights,pages_manage_engagement' });
  } else {
    console.error('Facebook SDK not loaded or initialized');
  }
};

const sendTokensToBackend = (accessToken) => {
  const jwtToken = localStorage.getItem('token');

  fetch('http://localhost:5000/api/facebook/tokens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jwtToken,
      facebookAccessToken: accessToken
    })
  })
  .then(response => {
    if (response.ok) {
      console.log('Tokens sent to backend successfully');
    } else {
      console.error('Failed to send tokens to backend');
    }
  })
  .catch(error => {
    console.error('Error sending tokens to backend:', error);
  });
};

//log out
const handleLogout = async () => {
  const userId = getUserIdFromToken(token);
  try {
    // Remove Facebook access token from the backend
    await axios.post('http://localhost:5000/logout/facebooklogout', { userId });
    toast.success('Logged out from Facebook successfully');
    window.location.reload(true);
  } catch (error) {
    // Log detailed error information
    console.error('Error logging out from Facebook:', error.response ? error.response.data : error.message);
    toast.error('Error logging out from Facebook: ' + (error.response ? error.response.data.message : error.message));
  }
};

const handleTwitterLogout = async () => {
  const userId = getUserIdFromToken(token);
  console.log(userId);
  try {
    // Remove Twitter user ID from the backend
    await axios.post('http://localhost:5000/logout/twitterlogout', { userId });
    toast.success('Logged out from Twitter successfully');
    window.location.reload(true);
  } catch (error) {
    console.error('Error logging out from Twitter:', error);
    toast.error('Error logging out from Twitter: ' + error.message);
  }
};

  return (
    <div className="w-full relative bg-color overflow-hidden flex flex-row items-start justify-start tracking-[normal] leading-[normal] mq1050:pr-5 mq1050:box-border">
    <Sidebar />
    <main className="flex-1 flex flex-col items-start justify-start max-w-[calc(100%_-_233px)] mq1050:max-w-full">
      <Navbar
        gettingStarted="Getting Started"
        mingcuteuser4Line="/mingcuteuser4line-1.svg"
      />
      <section className="self-stretch flex flex-row items-center justify-center py-[87.9px] px-5 box-border max-w-full shrink-0 mq450:pt-[29px] mq450:pb-[29px] mq450:box-border mq725:pt-[37px] mq725:pb-[37px] mq725:box-border mq1000:pt-11 mq1000:pb-11 mq1000:box-border">
      <ToastContainer
    style={{ fontSize: '1rem' }} // Adjust the font size as needed
/>
      <section className="w-[1628px] flex-1 flex flex-col items-center justify-start py-0 px-5 box-border max-w-full text-right text-[36px] text-gray-500 font-roboto lg:items-start lg:justify-start mq750:items-start mq750:justify-start mq1050:items-start mq1050:justify-start">
          <div className="w-[788px] flex flex-col items-end justify-start gap-[88px] max-w-full mq450:gap-[22px] mq1050:gap-[44px]">
            <div className="self-stretch flex flex-col items-start justify-start gap-[6px] max-w-full">
              <div className="w-[765px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
                <h1 className="m-0 w-[601px] relative text-center leading-[40px] font-bold font-inherit inline-block shrink-0 mq450:text-[22px] mq450:leading-[24px] mq1050:text-[29px] mq1050:leading-[32px]">
                  Connect Your Social Media Channels
                </h1>
              </div>
              <div className="self-stretch relative text-lg leading-[28px] text-black text-center">
                Manage and schedule your content efficiently by connecting your
                social media accounts.
              </div>
            </div>
            <div className="w-[774px] flex flex-row items-start justify-end py-0 px-[25px] box-border max-w-full">
            <div
      className={`flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] flex flex-col items-start justify-start pt-2 px-0 pb-0 box-border gap-[30px] max-w-full text-left text-base text-black font-roboto`}
    >
      <div className="self-stretch shadow-[0px_1px_2px_-1px_rgba(0,_0,_0,_0.1),_0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_0px_0px_#000,_0px_0px_0px_#000] rounded-lg bg-color overflow-hidden flex flex-row items-start justify-between py-[13px] px-[25px] gap-[20px] mq750:flex-wrap">
        <div className="w-[285.5px] flex flex-row items-start justify-start gap-[29.3px]">
          <img
            className="h-[50px] w-[50px] relative overflow-hidden shrink-0 min-h-[50px]"
            loading="lazy"
            alt=""
            src="/logosfacebook.svg"
          />
          <div className="flex-1 flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
            <div className="self-stretch flex flex-col items-start justify-start">
              <div className="w-[106.8px] relative leading-[24px] font-semibold inline-block">
                Facebook
              </div>
              <div className="self-stretch flex flex-row items-start justify-start text-sm text-slategray">
                <div className="relative leading-[20px] inline-block min-w-[96.7px] shrink-0">
                  Page or Group
                </div>
                <div className="flex-1 relative leading-[20px] text-dodgerblue shrink-0">
                  Most Popular
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start pt-[7px] px-0 pb-0">
  <button
    onClick={isFacebookConnected ? handleLogout : doLogin}
    className={`cursor-pointer border-none py-2 px-7 ${
      isFacebookConnected ? 'bg-green-500' : 'bg-button'
    } rounded flex flex-row items-start justify-start hover:bg-mediumslateblue`}
  >
    <div className="relative text-sm leading-[20px] font-medium font-roboto text-white text-center inline-block min-w-[53px]">
      {isFacebookConnected ? 'Connected' : 'Connect'}
    </div>
  </button>
</div>
      </div>
      <div className="self-stretch shadow-[0px_1px_2px_-1px_rgba(0,_0,_0,_0.1),_0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_0px_0px_#000,_0px_0px_0px_#000] rounded-lg bg-color overflow-hidden flex flex-row items-start justify-between py-[13px] pr-[25px] pl-[27px] box-border max-w-full gap-[20px] mq750:flex-wrap">
        <div className="w-[360.7px] flex flex-row items-start justify-start gap-[27.9px] max-w-full mq450:flex-wrap">
          <img
            className="h-[50px] w-[50px] relative overflow-hidden shrink-0 min-h-[50px]"
            loading="lazy"
            alt=""
            src="/skilliconsinstagram.svg"
          />
          <div className="flex-1 flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border min-w-[184px]">
            <div className="self-stretch flex flex-col items-start justify-start">
              <div className="w-[112.2px] relative leading-[24px] font-semibold inline-block">
                Instagram
              </div>
              <div className="self-stretch relative text-sm leading-[20px] text-slategray">
                Business or Creator accounts
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start pt-[7px] px-0 pb-0">
  <button
    onClick={isFacebookConnected ? handleLogout : doLogin}
    className={`cursor-pointer border-none py-2 px-7 ${
      isFacebookConnected ? 'bg-green-500' : 'bg-button'
    } rounded flex flex-row items-start justify-start hover:bg-mediumslateblue`}
  >
    <div className="relative text-sm leading-[20px] font-medium font-roboto text-white text-center inline-block min-w-[53px]">
      {isFacebookConnected ? 'Connected' : 'Connect'}
    </div>
  </button>
</div>
      </div>
      <div className="self-stretch shadow-[0px_1px_2px_-1px_rgba(0,_0,_0,_0.1),_0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_0px_0px_#000,_0px_0px_0px_#000] rounded-lg bg-color overflow-hidden flex flex-row items-start justify-between py-4 px-[25px] gap-[20px] mq750:flex-wrap">
        <div className="h-[62px] w-[260.9px] relative">
          <img
            className="absolute h-full top-[0px] bottom-[0px] left-[0px] rounded-9980xl max-h-full w-[65px]"
            loading="lazy"
            alt=""
            src="/frame.svg"
          />
          <div className="absolute top-[9px] left-[75px] w-[77.2px] flex flex-col items-start justify-start">
            <a className="[text-decoration:none] self-stretch relative leading-[24px] font-semibold text-[inherit]">
              Twitter
            </a>
            <div className="w-[68.2px] flex flex-row items-start justify-start text-sm text-slategray">
              <div className="flex-1 relative leading-[20px] shrink-0">
                Profile
              </div>
              <div className="flex flex-col items-start justify-start pt-px px-0 pb-0">
                <img
                  className="w-[18px] h-[18px] relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="/fluentemojiflattoparrow.svg"
                />
              </div>
            </div>
          </div>
          <div className="absolute top-[33px] left-[149.5px] text-sm leading-[20px] text-mediumspringgreen inline-block w-[111.4px]">
            Top Connected
          </div>
        </div>
        <div className="flex flex-col items-start justify-start pt-[13px] px-0 pb-0">
      {!isTwitterConnected && !pinSubmitted ? (
        <button 
          onClick={handleTweetSubmit}
          className="cursor-pointer border-none py-2 px-7 bg-button rounded flex flex-row items-start justify-start hover:bg-mediumslateblue"
        >
          <div className="relative text-sm leading-[20px] font-medium font-roboto text-white text-center inline-block min-w-[53px]">
            Connect
          </div>
        </button>
      ) : pinSubmitted && !isTwitterConnected ? (
        <div>
          <input
            type="text"
            placeholder="Enter the PIN code here"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 mb-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button 
            onClick={handlePinSubmit}
            className="cursor-pointer border-none py-2 px-7 bg-button rounded flex flex-row items-start justify-start hover:bg-mediumslateblue text-white"
          >
            Submit PIN
          </button>
        </div>
      ) : (
        <button onClick={handleTwitterLogout} 
          className="cursor-pointer border-none py-2 px-7 bg-green-500 rounded flex flex-row items-start justify-start hover:bg-mediumslateblue text-white mt-2"
        >
          <div className="relative text-sm leading-[20px] font-medium font-roboto text-white text-center inline-block min-w-[53px]">
            Connected
          </div>
        </button>
      )}
    </div>

      </div>
      <div className="self-stretch shadow-[0px_1px_2px_-1px_rgba(0,_0,_0,_0.1),_0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_0px_0px_#000,_0px_0px_0px_#000] rounded-lg bg-color overflow-hidden flex flex-row items-start justify-between pt-[26px] pb-[18px] pr-[25px] pl-8 gap-[20px] mq450:flex-wrap">
        <div className="w-[173.9px] flex flex-row items-end justify-start gap-[17px]">
          <img
            className="h-[50px] w-[50px] relative overflow-hidden shrink-0"
            loading="lazy"
            alt=""
            src="/skilliconslinkedin.svg"
          />
          <div className="flex-1 flex flex-col items-start justify-start">
            <div className="w-[72px] relative leading-[24px] font-semibold inline-block">
              LinkedIn
            </div>
            <div className="self-stretch relative text-sm leading-[20px] text-slategray">
              Page or Profile
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start pt-[7px] px-0 pb-0">
      <button
        onClick={handleLinkedInAuth}
        className={`cursor-pointer border-none py-2 px-7 ${
          isLinkedInConnected ? 'bg-green-500' : 'bg-button'
        } rounded flex flex-row items-start justify-start hover:bg-mediumslateblue`}
      >
        <div className="relative text-sm leading-[20px] font-medium font-roboto text-white text-center inline-block min-w-[53px]">
          {isLinkedInConnected ? 'Connected' : 'Connect'}
        </div>
      </button>
    </div>
      </div>
    </div>
    </div>
          </div>
        </section>
    </section>
      </main>
    </div>
  );
};

export default Channels;