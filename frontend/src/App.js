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
<<<<<<< Updated upstream


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

=======
import Channels from './pages/Channels';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import GetStarted from './pages/GetStarted';
import CreatePost from './pages/CreatePost';
import Pricing from './pages/Pricing';

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
            <Route path="/channels" element={<Channels />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/post-analytics/:postId" element={<PostAnalytics />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          </Router>
  );
};


>>>>>>> Stashed changes
export default App;
