// frontend/client/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
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
import ChangePassword from './components/ChangePassword';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/getting-started" element={<GetStarted />} />

        <Route
          path="/dashboard"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Dashboard />} />}
        />
        <Route
          path="/create-post"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<CreatePost />} />}
        />
        <Route
          path="/library"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Library />} />}
        />
        <Route
          path="/post/:id"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<PostDetails />} />}
        />
        <Route
          path="/channels"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Channels />} />}
        />
        <Route
          path="/pricing"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Pricing />} />}
        />
        <Route
          path="/success"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<SuccessPage />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Profile />} />}
        />
        <Route
          path="/admindashboard"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<AdminDashboard />} />}
        />
        <Route
          path="/post-analytics/:postId"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<PostAnalytics />} />}
        />
        <Route
          path="/users"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<UserTable />} />}
        />
        <Route
          path="/userpost"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<UserPost />} />}
        />
        <Route
          path="/change"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<ChangePassword />} />}
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
