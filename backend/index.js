// backend/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
// const connectDB = require('./db');
const session = require('express-session');
const passport = require('passport');
const app = express();
const PORT = process.env.PORT || 5000;



// Middleware
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(session({ 
  secret: 'secret_key', 
  resave: false, 
  saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require('./config/passport');
// Routes
app.use('/auth', authRoutes);


mongoose.connect('mongodb://localhost:27017/PostPortal')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(error => console.error(error));


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// const session = require('express-session');
// const passport = require('passport');
// const https = require('https');
// const fs = require('fs');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());
// app.use(cors());
// app.use(express.json());
// app.use(session({ 
//   secret: 'secret_key', 
//   resave: false, 
//   saveUninitialized: false 
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Passport configuration
// require('./config/passport');

// // Routes
// app.use('/auth', authRoutes);

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/PostPortal')
//   .then(() => {
//     console.log('Connected to MongoDB');
    
//     // Create HTTPS server
//     const options = {
//       key: fs.readFileSync('localhost-key.pem'),
//       cert: fs.readFileSync('localhost.pem')
//     };

//     https.createServer(options, app).listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch(error => console.error(error));
