import React, { useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton = () => {
  useEffect(() => {
    
    window.fbAsyncInit = function() {
        window.FB.init({
          appId      : '1163840038153381',
          cookie     : true,
          xfbml      : true,
          version    : 'v19.0'
        });
          
        window.FB.AppEvents.logPageView();   
          
      };
    
      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "https://connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
  }, []);

  const responseFacebook = (response) => {
    console.log(response);
    // Handle the response here, e.g., send it to the backend for authentication
  };

  return (
    <div>
      <FacebookLogin
        appId="1163840038153381"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
      />
    </div>
  );
};

export default FacebookLoginButton;
// // Initialize Facebook SDK asynchronously
// window.fbAsyncInit = function() {
//     window.FB.init({
//       appId: '1163840038153381',
//       status     : true, 
//           cookie     : true,
//           xfbml      : true,
//           oauth      : true,
//       version: 'v19.0'
//     });
//   };

//   // Load the SDK asynchronously
//   (function(d, s, id) {
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) return;
//     js = d.createElement(s); js.id = id;
//     js.src = "https://connect.facebook.net/en_US/sdk.js";
//     fjs.parentNode.insertBefore(js, fjs);
//   }(document, 'script', 'facebook-jssdk'));