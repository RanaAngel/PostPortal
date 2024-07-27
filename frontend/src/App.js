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
import Channels from './pages/Channels';
import GetStarted from './pages/GetStarted';
import CreatePost from './pages/CreatePost';
import Pricing from './pages/Pricing';
import PostDetails from './pages/PostDetails'; 
import Profile from './pages/Profile'; 
import SuccessPage from './pages/SuccessPage'; 
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import UserTable from './components/UserTable';
import UserPost from './components/UserPost';

const App = () => {
  
  return(
  <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
            <Route path="/getting-started" element={<GetStarted />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/library" element={<Library />} />
            <Route path="/post/:id" element={<PostDetails />}/>
            <Route path="/channels" element={<Channels />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/post-analytics" element={<PostAnalytics />} />
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/users" element={<UserTable />}/>
            <Route path="/userpost" element={<UserPost />}/>
               
          </Routes>
          </Router>
  );
};


export default App;
