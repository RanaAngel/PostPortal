import React, { useState, useEffect } from 'react';

const FacebookFlow = () => {
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
        console.log('Response data:', data);

        if (data.facebookAccessToken) {
          console.log('Facebook access token found:', data.facebookAccessToken);
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

  const handleLogout = () => {
    localStorage.removeItem('facebookAccessToken');
    setIsLoggedIn(false);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <button onClick={doLogin}>Facebook Login</button>
      ) : (
        <div>
          <p>Logged in with Facebook</p>
          <button onClick={handleLogout}>Logout</button>
          
        </div>
      )}
    </div>
  );
};

export default FacebookFlow;
