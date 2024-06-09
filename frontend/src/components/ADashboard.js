// UserTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { set } from 'mongoose';

const ADashboard = () => {
  const [dashboard, setDashboard] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/get_users');
        setDashboard(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDashboard();
  }, []);

  return (
   <div className="text-xl font-bold mb-4">Dashboard</div>
  );
};

export default ADashboard;
