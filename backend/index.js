// backend/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
<<<<<<< Updated upstream
const session = require('express-session');
const passport = require('./config/passport');
=======
const twitterRoutes = require('./routes/twitterRoute'); // Share on twitter + oauth
const linkedinRoutes = require('./routes/linkedinRoute');//oauth for linkedin
const shareOnLinkedin = require('./routes/postLinkedin'); //share post on linkedin.....
const adminRoutes = require('./routes/adminRoute');//route for admin panel
const dashboardRoutes = require('./routes/dashboardRoute');//route for dashboard
const facebookRoute = require('./routes/facebookRoute');
const instaRoute = require('./routes/instaRoute');
// const analyticsRoute=require('./routes/analyticsRoute');
const path = require('path'); // Import path module

 
>>>>>>> Stashed changes
const app = express();

const PORT = process.env.PORT || 5000;



// Middleware
app.use(express.json());
app.use(cors());



// Routes
app.use('/auth', authRoutes);
<<<<<<< Updated upstream
=======
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
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
>>>>>>> Stashed changes


mongoose.connect('mongodb://localhost:27017/PostPortal')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(error => console.error(error));



