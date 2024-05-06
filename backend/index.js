// backend/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const twitterRoutes = require('./routes/twitterRoute'); // Import twitterRoute.js
const {Authorization,Redirect}=require("./routes/linkedinRoute");

 
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST'],
  credentials: true // Allow cookies to be sent along with the request
}));

// Routes
app.use('/auth', authRoutes);
//Twitter Routes:
app.use('/twitter', twitterRoutes);
//Linkedin Routes:
app.get('/api/linkedin/authorize',(req,res)=>{
  return res.redirect(Authorization());
});
app.get('/api/linkedin/redirect', async(req, res)=>{
  return res.json(Redirect(req.query.code));
});


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/PostPortal', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(error => console.error(error));







 