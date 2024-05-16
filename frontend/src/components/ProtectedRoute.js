// frontend/client/src/components/ProtectedRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token');

  return isAuthenticated ? <Route {...rest} element={<Component />} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
