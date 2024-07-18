import React, { useState } from 'react';
import axios from 'axios';
import FacebookFlow from '../components/FacebookFlow';

const Channels = () => {
  const [pin, setPin] = useState('');

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

  return (
    <div className="p-4 space-y-4">
      <button onClick={handleTweetSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Connect to Twitter</button><br />
      <input
        type="text"
        placeholder="Enter the PIN code here"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button onClick={handlePinSubmit} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Submit PIN</button><br />
      <button onClick={handleLinkedInAuth} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">Connect to LinkedIn</button><br />
      <FacebookFlow />
    </div>
  );
};

export default Channels;
