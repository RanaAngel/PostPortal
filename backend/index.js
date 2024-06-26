// backend/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');
const passport = require('./config/passport');
const app = express();

const PORT = process.env.PORT || 5000;



// Middleware
app.use(express.json());
app.use(cors());



// Routes
app.use('/auth', authRoutes);


mongoose.connect('mongodb://localhost:27017/PostPortal')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(error => console.error(error));



