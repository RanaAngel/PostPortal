// // import React, { useEffect } from 'react';

// // const FlowFacebook = () => {
// //   useEffect(() => {
// //     // Function to perform GET operation
// //     const performGetOperation = async (url, headers) => {
// //       try {
// //         const res = await fetch(url, {
// //           mode: "cors",
// //           method: "GET",
// //           headers: headers,
// //         });
// //         return await res.json();
// //       } catch (error) {
// //         throw new Error("full-flow-facebook : " + error.message);
// //       }
// //     };

// //     // Function to get access token
// //     const getAppToken = async () => {
// //     const url = `https://graph.facebook.com/oauth/access_token?client_id=${'1163840038153381'}&client_secret=${'5941a2df751d1e3aae72e29dc3648674'}&grant_type=client_credentials`;
// //       let headers = new Headers();
// //       headers.append("Accept", "application/json");
// //       return performGetOperation(url, headers);
// //     };

// //     // Add other functions for fetching data from Facebook APIs

// //     // Initialize Facebook SDK
// //     const initializeFbScripts = () => {
// //       window.fbAsyncInit = function () {
// //         window.FB.init({
// //           appId: 1163840038153381,
// //           cookie: true,
// //           xfbml: true,
// //           version: "v19.0",
// //         });

// //         window.FB.AppEvents.logPageView();
// //       };

// //       (function (d, s, id) {
// //         var js,
// //           fjs = d.getElementsByTagName(s)[0];
// //         if (d.getElementById(id)) {
// //           return;
// //         }
// //         js = d.createElement(s);
// //         js.id = id;
// //         js.src = "https://connect.facebook.net/en_US/sdk.js";
// //         fjs.parentNode.insertBefore(js, fjs);
// //       })(document, "script", "facebook-jssdk");
// //     };



// //     // Initialize Facebook SDK on component mount
// //     initializeFbScripts();
// //   }, []);

// //   // Function to print data into DOM nicely
// //   const printData = (domId, dataObject) => {
// //     document.getElementById(domId).innerHTML = JSON.stringify(
// //       dataObject,
// //       null,
// //       "\n\t"
// //     );
// //   };
// // // Initialize window.flowFacebookData with default values
// // const defaultFlowFacebookData = {
// //     loginSuccessFunc: () => {},
// //     loginFailFunc: () => {},
// //   };

// //   // Ensure that window.flowFacebookData exists and has necessary properties
// //   window.flowFacebookData = window.flowFacebookData || defaultFlowFacebookData;
// //   const doLogin = () => {
// //     window.FB.login(
// //       function (response) {
// //         if (response.status === "connected") {
// //           // Logged into your webpage and Facebook.
// //           return doLoginSuccess(response);
// //         }
// //         return doLoginFail(response);
// //       },
// //       { scope: "email,public_profile,pages_show_list,instagram_basic,pages_read_engagement,read_insights,ads_read,instagram_manage_insights,pages_manage_engagement" }
// //     );
// // };
// // // Function to handle login success
// // const doLoginSuccess = async (responseData) => {
// //     const userIdResponse = responseData.authResponse.userID;
// //     const accessTokenResponse = responseData.authResponse.accessToken;
// //     return window.flowFacebookData.loginSuccessFunc({
// //       userIdInfo: userIdResponse,
// //       accessTokenInfo: accessTokenResponse,
// //     });
// //   };

// //   // Function to handle login failure
// //     const doLoginFail = async (responseData) => {
// //       return window.flowFacebookData.loginFailFunc(responseData);
// //     };

// //   return (
// //     <div>
// //       <h2>Objective:</h2>
// //       <h4>
// //         Test Your Facebook login, grab your Facebook linked page, and then grab
// //         the Instagram information
// //       </h4>
// //       <h3>Step 0: Facebook login</h3>
// //       <button onClick={doLogin}>Facebook Login</button>

// //       {/* Display data */}
// //       <h3 className="">Step 1: Get my Facebook account</h3>
// //       <pre className="even" id="MyFacebookAccount"></pre>
// //       <h3 className="">Step 2: Get my Facebook-related account</h3>
// //       <pre className="odd" id="MyFacebookAccountInfo"></pre>
// //       <h3 className="">Step 4: Get my Instagram business account</h3>
// //       <pre className="even" id="MyFacebookBizInstaAccountInfo"></pre>
// //       <h3 className="">Step 5: Get Insta profile account</h3>
// //       <pre className="odd" id="MyInstaAccountInfo"></pre>
// //       <h3 className="">Step 7: Get Insta profile insights</h3>
// //       <pre className="even" id="MyInstaAccountInsights"></pre>

// //       <h3 className="">Step 7: Get Insta posts and info</h3>
// //       <pre className="odd" id="MyInstaAccountPosts"></pre>
// //     </div>
// //   );
// // };

// // export default FlowFacebook;
// import React, { useEffect } from 'react';

// const FlowFacebook = () => {
//   useEffect(() => {
//     // Function to perform GET operation
//     const performGetOperation = async (url, headers) => {
//       try {
//         const res = await fetch(url, {
//           mode: "cors",
//           method: "GET",
//           headers: headers,
//         });
//         return await res.json();
//       } catch (error) {
//         throw new Error("full-flow-facebook : " + error.message);
//       }
//     };

//     // Function to get access token
//     const getAppToken = async () => {
//       const url = `https://graph.facebook.com/oauth/access_token?client_id=${'1163840038153381'}&client_secret=${'5941a2df751d1e3aae72e29dc3648674'}&grant_type=client_credentials`;
//       let headers = new Headers();
//       headers.append("Accept", "application/json");
//       return performGetOperation(url, headers);
//     };

//     // Initialize Facebook SDK
//     const initializeFbScripts = () => {
//       window.fbAsyncInit = function () {
//         window.FB.init({
//           appId: 1163840038153381,
//           cookie: true,
//           xfbml: true,
//           version: "v19.0",
//         });

//         window.FB.AppEvents.logPageView();
//       };

//       (function (d, s, id) {
//         var js,
//           fjs = d.getElementsByTagName(s)[0];
//         if (d.getElementById(id)) {
//           return;
//         }
//         js = d.createElement(s);
//         js.id = id;
//         js.src = "https://connect.facebook.net/en_US/sdk.js";
//         fjs.parentNode.insertBefore(js, fjs);
//       })(document, "script", "facebook-jssdk");
//     };

//     // Initialize Facebook SDK on component mount
//     initializeFbScripts();
//   }, []);

//   // Function to print data into DOM nicely
//   const printData = (domId, dataObject) => {
//     document.getElementById(domId).innerHTML = JSON.stringify(
//       dataObject,
//       null,
//       "\n\t"
//     );
//   };

//   const doLogin = () => {
//     window.FB.login(
//       function (response) {
//         if (response.status === "connected") {
//           // Logged into your webpage and Facebook.
//           return doLoginSuccess(response.authResponse.accessToken);
//         }
//         return doLoginFail(response);
//       },
//       { scope: "email,public_profile,pages_show_list,instagram_basic,pages_read_engagement,read_insights,ads_read,instagram_manage_insights,pages_manage_engagement" }
//     );
//   };

//   // Function to handle login success
//   const doLoginSuccess = async (accessToken) => {
//     // Call API functions with accessToken directly
//     // Example:
//     // const fbInfo = await getMyfbAccInfo(userId, accessToken);
//   };

//   // Function to handle login failure
//   const doLoginFail = async (responseData) => {
//     return window.flowFacebookData.loginFailFunc(responseData);
//   };

//   return (
//     <div>
//       <h2>Objective:</h2>
//       <h4>
//         Test Your Facebook login, grab your Facebook linked page, and then grab
//         the Instagram information
//       </h4>
//       <h3>Step 0: Facebook login</h3>
//       <button onClick={doLogin}>Facebook Login</button>

//       {/* Display data */}
//       <h3 className="">Step 1: Get my Facebook account</h3>
//       <pre className="even" id="MyFacebookAccount"></pre>
//       <h3 className="">Step 2: Get my Facebook-related account</h3>
//       <pre className="odd" id="MyFacebookAccountInfo"></pre>
//       <h3 className="">Step 4: Get my Instagram business account</h3>
//       <pre className="even" id="MyFacebookBizInstaAccountInfo"></pre>
//       <h3 className="">Step 5: Get Insta profile account</h3>
//       <pre className="odd" id="MyInstaAccountInfo"></pre>
//       <h3 className="">Step 7: Get Insta profile insights</h3>
//       <pre className="even" id="MyInstaAccountInsights"></pre>

//       <h3 className="">Step 7: Get Insta posts and info</h3>
//       <pre className="odd" id="MyInstaAccountPosts"></pre>
//     </div>
//   );
// };

// export default FlowFacebook;
