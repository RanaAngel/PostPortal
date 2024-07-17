// frontend/client/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/Home/LandingPage';
import SignupForm from './pages/SignUpForm';
import LoginForm from './pages/LoginForm';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Library from './pages/Library';
import PostAnalytics from './pages/PostAnalytics'; 


const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/library" element={<Library />} /> {/* New Library Route */}
        <Route path="/post-analytics/:postId" element={<PostAnalytics />} /> {/* New PostAnalytics Route */}
       
      </Routes>
    </Router>
  );
};

export default App;
