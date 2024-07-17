// backend/index.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const twitterRoutes = require('./routes/twitterRoute'); // Share on twitter + oauth
const linkedinRoutes = require('./routes/linkedinRoute');//oauth for linkedin
const shareOnLinkedin = require('./routes/postLinkedin'); //share post on linkedin.....
const adminRoutes = require('./routes/adminRoute');//route for admin panel
const dashboardRoutes = require('./routes/dashboardRoute');//route for dashboard
const facebookRoute = require('./routes/facebookRoute');
const instaRoute = require('./routes/instaRoute');
const stripeRoutes = require('./routes/stripeRoute');
// const analyticsRoute=require('./routes/analyticsRoute');

 
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/auth', authRoutes);
//Twitter Routes:
app.use('/twitter', twitterRoutes);
//Linkedin Routes:
app.use('/linkedin', linkedinRoutes);
app.use('/sharePost', shareOnLinkedin);
app.use('/admin', adminRoutes);
app.use('/dashboard', dashboardRoutes);
//Facebook Route
app.use('/api/facebook', facebookRoute);
//Instagram Route
app.use('/api/instagram', instaRoute);
//Analytics Route
// app.use('/analytics',analyticsRoute);

//stripe Route
app.use('/stripe', stripeRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    // console.log('Routes registered');
  })
  .catch(error => console.error(error));







 