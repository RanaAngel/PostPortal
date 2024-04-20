// frontend/client/src/components/Dashboard.js

// import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FacebookLoginButton from '../components/FacebookLoginButton';

const Dashboard = () => {
  
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from local storage
    
    navigate('/'); // Redirect to Landing page after logout
    window.location.reload(true);
  };
  
  // useEffect(() => {
  //   // Check if token is available in local storage
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     // If token is not available, prompt the user to login again
  //     alert('Please login again.');
  //     navigate('/login'); // Redirect to login page
  //   }
  // }, [navigate]); 

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard!</p>
      <button onClick={handleLogout}>Logout</button>
      <FacebookLoginButton /> {/* Include the FacebookLoginButton component */}
    </div>
  );
};

export default Dashboard;

