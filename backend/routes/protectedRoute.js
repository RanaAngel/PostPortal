// backend/routes/protectedRoute.js

const jwt = require('jsonwebtoken');

const protectRoute = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authorization token not found' });
  }

  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = protectRoute;
// backend/routes/protectedRoutes.js

const express = require('express');
const protectRoute = require('./protectedRoute');

const router = express.Router();

router.get('/protected', protectRoute, (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});



module.exports = router;
