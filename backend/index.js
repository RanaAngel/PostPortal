// backend/index.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const twitterRoutes = require('./routes/twitterRoute'); // Import twitterRoute.js
const linkedinRoutes = require('./routes/linkedinRoute');
const shareOnLinkedin = require('./routes/postLinkedin'); //share post on linkedin.....
const adminRoutes = require('./routes/adminRoute');//admin panel
const facebookRoute = require('./routes/facebookRoute');

 
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// CORS configuration
// app.use(cors({
//   origin: 'http://localhost:3000', // Replace with your frontend URL
//   methods: ['GET', 'POST'],
//   credentials: true // Allow cookies to be sent along with the request
// }));

// Routes
app.use('/auth', authRoutes);
//Twitter Routes:
app.use('/twitter', twitterRoutes);
//Linkedin Routes:
app.use('/linkedin', linkedinRoutes);
app.use('/sharePost', shareOnLinkedin);
app.use('/admin', adminRoutes);
//Facebook Route
app.use('/api/facebook', facebookRoute);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/PostPortal', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    // console.log('Routes registered');
  })
  .catch(error => console.error(error));







 