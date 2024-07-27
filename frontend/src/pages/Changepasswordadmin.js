import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Profile from './Profile';
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

      await axios.patch('http://localhost:5000/dashboard/changePassword', {
        userId,
        currentPassword,
        newPassword
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
    <div className="w-full relative bg-color overflow-hidden flex flex-row items-start justify-start tracking-[normal] leading-[normal] mq1050:pr-5 mq1050:box-border">
    <Sidebar />
    <main className="flex-1 flex flex-col items-end justify-start gap-[4px] max-w-[calc(100%_-_222px)] lg:max-w-full">
        <Navbar
            gettingStarted="Getting Started"
            mingcuteuser4Line="/mingcuteuser4line-1.svg"
        />
       <section className="w-1/2 flex flex-row items-start justify-start py-0 px-8 box-border max-w-full text-center text-[32px] font-poppins mq1325:flex-row mq1325:pl-2.5 mq1325:pr-2.5 mq1325:box-border">
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Change Password
        </button>
      </form>
      <button
        onClick={() => navigate('/profile')} // Navigate back to profile page
        className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
      >
        Go Back
      </button>
    </div>
    </section>
    </main>
    </div>
  );
};

export default ChangePassword;
