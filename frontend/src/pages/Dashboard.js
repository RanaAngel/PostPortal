import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, redirect } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import axios from 'axios';

import FacebookFlow from '../components/FacebookFlow';
import CreatePost from '../components/CreatePost';
import ViewPost from '../components/ViewPost';
import UpgradePlan from '../components/UpgradePlan';


const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [lastActivityTime, setLastActivityTime] = useState(new Date());
  const [tweetText, setTweetText] = useState('');//twitter
  const [pin, setPin] = useState('');//twitter
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isViewPostModalOpen, setIsViewPostModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpgradePlanModalOpen, setIsUpgradePlanModalOpen] = useState(false); // State for UpgradePlan modal



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
        const maxInactiveTime = 10 * 60 * 2000; // 20 minutes in milliseconds

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
   const openCreatePostModal = () => {
    setIsCreatePostModalOpen(true);
  };

  const closeCreatePostModal = () => {
    setIsCreatePostModalOpen(false);
  };

  //VIEW POST
  const openViewPostModal = () => {
    setIsViewPostModalOpen(true);
  };

  const closeViewPostModal = () => {
    setIsViewPostModalOpen(false);
  };

  const openUpgradePlanModal = () => {
    setIsUpgradePlanModalOpen(true);
  };

  const closeUpgradePlanModal = () => {
    setIsUpgradePlanModalOpen(false);
  };

  // // Twitter
  const handleTweetSubmit = async () => {
    // Send the code challenge to your backend to initiate the OAuth flow
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
      // Send the PIN and oauth_token to your backend
      const response = await axios.post(`http://localhost:5000/twitter/callback?token=${encodeURIComponent(token)}`, {
        oauth_token: oauthToken,
        oauth_token_secret: oauthTokenSecret,
        pin: pin
      });

      // Handle the response (e.g., store tokens, show success message)
      const { AccessToken, userId } = response.data;
      localStorage.setItem('access_token', JSON.stringify(AccessToken));
      localStorage.setItem('twitter_user_id', userId);
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting PIN:', error);
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

  const goToLibrary = () => {
    navigate('/library');
  };



  return (
    <div > 
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
            <button onClick={handleLinkedInAuth}>Connect to LinkedIn</button><br />
            {/* Create Post */}
            <button onClick={openCreatePostModal}>Create Post</button><br />
            <Modal
                isOpen={isCreatePostModalOpen}
                onRequestClose={closeCreatePostModal}
                contentLabel="Create Post"
            >
                <CreatePost closeCreatePostModal={closeCreatePostModal} />
            </Modal>
            {/* View Post */}
            <button onClick={openViewPostModal}>View Post</button><br />
            <Modal
                isOpen={isViewPostModalOpen}
                onRequestClose={closeViewPostModal}
                contentLabel="View Post"
            >
                <ViewPost closeViewPostModal={closeViewPostModal} />
            </Modal>
            <FacebookFlow />
            <button onClick={goToLibrary}>Go to Library</button> {/* New Button to Navigate to Library */}<br />

           <button onClick={openUpgradePlanModal}>Upgrade plan</button>
    <Modal
      isOpen={isUpgradePlanModalOpen}
      toggle={closeUpgradePlanModal}
      centered
      size="lg"
      style={{ maxWidth: '80%', maxHeight: '70%' }}
    >
      <ModalHeader toggle={closeUpgradePlanModal}>
        Upgrade Plan
        <button type="button" onClick={closeUpgradePlanModal} className="bg-red-500 absolute top-0 right-12 m-12 text-xl p-2">
  &times;
</button>
      </ModalHeader>
      <ModalBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', overflowY: 'auto' }}>
      <div className="max-w-md mx-auto">
          <UpgradePlan />
        </div>
      </ModalBody>
    </Modal>
<br />
            <button onClick={handleLogout}>Logout</button>

        </div>
  );
};

export default Dashboard;
