// frontend/client/src/components/Dashboard.js

import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FacebookFlow from '../components/FacebookFlow';


const Dashboard = () => {
  
  const navigate = useNavigate();
  const [lastActivityTime, setLastActivityTime] = useState(new Date());


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
        const maxInactiveTime = 1 * 60 * 1000; // 10 minutes in milliseconds

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


  return (
    <div>
      <h2>Dashsbord</h2>
      <p>Welcome to your dashboard!</p>
      <button onClick={handleLogout}>Logout</button>
      <FacebookFlow /> {/* Include the FacebookLoginButton component */}
      {/* <FlowFacebook /> */}
    </div>
  );
};

export default Dashboard;

