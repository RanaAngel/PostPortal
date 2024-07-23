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
import Pricing from './pages/Pricing';
import PostDetails from './pages/PostDetails'; 

const App = () => {
  
  return(
  <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/getting-started" element={<GetStarted />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/library" element={<Library />} />
            <Route path="/post/:id" element={<PostDetails />}/>
            <Route path="/channels" element={<Channels />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/post-analytics/:postId" element={<PostAnalytics />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          </Router>
  );
};


export default App;
