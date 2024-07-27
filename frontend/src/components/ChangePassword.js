import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


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
      const response = await fetch(`http://52.20.87.194:5000/dashboard/change_password`, {
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
    <div className="flex flex-col gap-4 mt-4">
      <h2 className="text-2xl font-bold">Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="oldPassword" className="text-gray-700 font-medium">
            Existing Password
          </label>
          <input
            type="password"
            id="oldPassword"
            className="px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:ring-1 focus:ring-opacity-50"
            value={oldPassword}
            onChange={handleOldPasswordChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="newPassword" className="text-gray-700 font-medium">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            className="px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:ring-1 focus:ring-opacity-50"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="text-gray-700 font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:ring-1 focus:ring-opacity-50"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleCancelClick} 
            className="bg-red-600 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
