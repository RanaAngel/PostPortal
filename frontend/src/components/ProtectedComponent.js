// frontend/client/src/components/ProtectedComponent.js

import React, { useState, useEffect } from 'react';

const ProtectedComponent = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:5000/protected', {
      method: 'GET',
      headers: {
        'Authorization': token // Send token in Authorization header
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Unauthorized');
      }
      return response.json();
    })
    .then(data => {
      setMessage(data.message);
    })
    .catch(error => {
      console.error('Protected route error:', error.message);
      setMessage('Unauthorized');
    });
  }, []);

  return (
    <div>
      <h2>Protected Component</h2>
      <p>{message}</p>
    </div>
  );
};

export default ProtectedComponent;
