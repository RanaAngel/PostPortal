import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Profile from '../pages/Profile';
import {jwtDecode} from 'jwt-decode'; // Ensure jwtDecode is imported

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const userId = jwtDecode(token).userId;

      await axios.post('http://localhost:5000/dashboard/change_password', {
        userId,
        oldPassword:currentPassword,
        newPassword:newPassword,
        confirmPassword:confirmNewPassword
      });

      toast.success('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      navigate('/profile'); // Redirect to profile after successful password change
    } catch (error) {
      console.error('Error changing password', error);
      toast.error('Failed to change password');
    }
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
          <form onSubmit={handleChangePassword}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="cursor-pointer px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:ring focus:ring-gray-300"
              >
                Change Password
              </button>
              <button
                onClick={() => navigate('/profile')} // Navigate back to profile page
                className="cursor-pointer px-4 py-2 border-purple bg-transparent text-gray-700 rounded outline outline-offset-2 outline-purple-500  focus:ring-gray-300"
              >
                Go Back
              </button>
            </div>
          </form>
          <ToastContainer />
        </section>
    </main>
    </div>
  );
};

export default ChangePassword;