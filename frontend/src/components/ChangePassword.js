import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from '../components/Sidebar';
import Profile from '../pages/Profile';
import Navbar from '../components/Navbar';
import {jwtDecode} from 'jwt-decode'; // Ensure jwtDecode is imported

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const navigate = useNavigate(); // Initialize useNavigate
  
     // Function to get user ID from JWT token
     const getUserIdFromToken = (token) => {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        return userId;
      } catch (error) {
        console.error('Invalid token:', error);
        return null;
      }
    };
  
    const token = localStorage.getItem('token');
    const userId = getUserIdFromToken(token);
  
  
    const handleOldPasswordChange = (e) => {
      setOldPassword(e.target.value);
    };
  
    const handleNewPasswordChange = (e) => {
      setNewPassword(e.target.value);
    };
  
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const response = await fetch(`http://localhost:5000/dashboard/change_password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Include other necessary headers here, such as authorization tokens
          },
          body: JSON.stringify({
            userId, 
            oldPassword,
            newPassword,
            confirmPassword,
          }),
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        alert("password changed successfully");
          console.log('Password changed successfully');
         navigate(0);
    
      } catch (error) {
        console.error('There was a problem changing the password:', error);
      }
    };
    
  
  
    const handleCancelClick = () => {
      navigate(0); // Navigate back to the previous page
    };
  

  return (
    <div className="w-full h-full relative bg-color overflow-hidden flex flex-row items-start justify-start tracking-[normal] leading-[normal] mq1050:pr-5 mq1050:box-border">
    <Sidebar />
    <main className="flex-1 flex flex-col items-center justify-start gap-[4px] max-w-full lg:max-w-full">
        <Navbar
            gettingStarted="Getting Started"
            mingcuteuser4Line="/mingcuteuser4line-1.svg"
        />
      <section className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mt-24">
          <h2 className="text-lg font-semibold mb-6 text-center">Change Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={handleOldPasswordChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring focus:ring-purple-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
             required
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring focus:ring-purple-200"
                
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
            required
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring focus:ring-purple-200"
               
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="cursor-pointer px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:ring focus:ring-gray-300"
              >
                Change Password
              </button>
              <div className='gap-5 items-start justify-between'>
              <button
            type="button"
            onClick={handleCancelClick} 
            className="cursor-pointer m-5 bg-transparent outline outline-offset-2 outline-red-500  text-black font-normal py-2 px-4 rounded focus:outline-none focus-shadow-outline"
          >
            Cancel
          </button>
              <button
                onClick={() => navigate('/profile')} // Navigate back to profile page
                className="cursor-pointer px-4 py-2 border-purple bg-transparent text-gray-700 rounded outline outline-offset-2 outline-purple-500  focus:ring-gray-300"
              >
                Go Back
              </button>
              </div>
            </div>
          </form>
          <ToastContainer />
        </section>
    </main>
    </div>
  );
};

export default ChangePassword;
