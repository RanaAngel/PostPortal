// frontend/client/src/components/LoginForm.js

import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const navigate = useNavigate(); // Initialize useHistory
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const { token } = await response.json();
    localStorage.setItem('token', token);
      alert('Login successful');
      navigate('/dashboard'); // Redirect or do something else after successful login
    } catch (error) {
      console.error('Login error:', error.message);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
