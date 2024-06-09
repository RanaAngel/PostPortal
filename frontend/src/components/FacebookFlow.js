
import React, { useState, useEffect } from 'react';

const FacebookFlow = () => {
  const [pages, setPages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '1163840038153381',
        cookie: true,
        xfbml: true,
        version: 'v19.0'
      });

      window.FB.AppEvents.logPageView();
      
      // Now that the SDK is initialized, check if the user is already logged in
      // checkLoginStatus();
    };
  
    // Load the Facebook SDK asynchronously
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  // // Include checkLoginStatus in the dependency array
  // useEffect(() => {
  //   checkLoginStatus();
  // }, []);

  const doLogin = () => {
    window.FB.login(function (response) {
      if (response.status === "connected") {
        localStorage.setItem('facebookAccessToken', response.authResponse.accessToken);
        setIsLoggedIn(true);
        sendAccessTokenToBackend(response.authResponse.accessToken);
        fetchFacebookPages(response.authResponse.accessToken);
      } else {
        // Handle login failure
      }
    }, { scope: "email,public_profile,pages_show_list,instagram_basic,pages_read_engagement,read_insights,ads_read,instagram_manage_insights,pages_manage_engagement" });
  };

  // const checkLoginStatus = () => {
  //   window.FB.getLoginStatus(function(response) {
  //     if (response.status === "connected") {
  //       setIsLoggedIn(true);
  //       sendAccessTokenToBackend(response.authResponse.accessToken);
  //       fetchFacebookPages(response.authResponse.accessToken);
  //     }
  //   });
  // };


  const sendAccessTokenToBackend = async (accessToken) => {
    try {
      await fetch('http://localhost:5000/auth/facebook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken }),
      });
    } catch (error) {
      console.error('Error sending access token to backend:', error);
    }
  };

  const fetchFacebookPages = async (accessToken) => {
    const response = await fetch(`https://graph.facebook.com/me/accounts?access_token=${accessToken}`);
    const data = await response.json();
    setPages(data.data);
  };

  const handleLogout = () => {
    localStorage.removeItem('facebookAccessToken');
    setIsLoggedIn(false);
    setPages([]);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <button onClick={doLogin}>Facebook Login</button>
      ) : (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <h2>Pages:</h2>
          <ul>
            {pages.map(page => (
              <li key={page.id}>{page.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FacebookFlow;

