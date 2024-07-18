// frontend/client/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/Home/LandingPage';
import SignupForm from './pages/SignUpForm';
import LoginForm from './pages/LoginForm';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Library from './pages/Library';
import PostAnalytics from './pages/PostAnalytics';
import Channels from './pages/Channels';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import GetStarted from './pages/GetStarted';
import CreatePost from './pages/CreatePost';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Simple authentication check
  const location = useLocation();

  // Define the paths where Navbar and Sidebar should be displayed
  const pathsWithNavAndSidebar = [
    '/getting-started',
    '/dashboard',
    '/create-post',
    '/library',
    '/channels',
  ];

  const shouldShowNavAndSidebar = pathsWithNavAndSidebar.includes(location.pathname);

  return (
    <div className="flex flex-col h-screen">
      {isAuthenticated && shouldShowNavAndSidebar && <Navbar />}
      <div className="flex flex-1">
        {isAuthenticated && shouldShowNavAndSidebar && <Sidebar />}
        <div className={`flex-1 p-4 ${isAuthenticated && shouldShowNavAndSidebar ? 'ml-64' : ''}`}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/getting-started" element={<GetStarted />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/library" element={<Library />} />
            <Route path="/channels" element={<Channels />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/post-analytics/:postId" element={<PostAnalytics />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
