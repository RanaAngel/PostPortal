// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTable from '../components/UserTable';
import ContactTable from '../components/ContactTable';
import Sidebar from '../components/AdminSidebar';
import ADashboard from '../components/ADashboard';
import UserPost from '../components/UserPost';


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [lastActivityTime, setLastActivityTime] = useState(new Date());
  const [activeComponent, setActiveComponent] = useState('dashboard');

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
        const maxInactiveTime = 10 * 60 * 1000;

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

  return (
    <div className="flex h-screen bg-blue-main-background overflow-hidden">
      <Sidebar setActiveComponent={setActiveComponent} handleLogout={handleLogout} />

      <div className="flex-1 bg-gray-100 text-white p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center">
            <input type="text" placeholder="Search..." className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button className="ml-4 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">Search</button>
            <div className="ml-4 relative">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135701.png" alt="Profile" className="w-8 h-8 rounded-full" />
              <div className="absolute bottom-full right-0 mr-2 white px-2 py-1 rounded-sm">
                Admin Name
                <br />
                Administrator
              </div>
            </div>
          </div>
        </div>

        {activeComponent === 'dashboard' && <ADashboard />}
        {activeComponent === 'users' && <UserTable />}
        {activeComponent === 'contacts' && <ContactTable />}
        {activeComponent === 'userpost' && <UserPost />}
        {/* Add more conditions for other components if needed */}
      </div>
    </div>
  );
};

export default AdminDashboard;
