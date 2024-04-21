
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');



// Facebook authentication strategy
passport.use(new FacebookStrategy({
  clientID: '1163840038153381',
  clientSecret: '5941a2df751d1e3aae72e29dc3648674',
  callbackURL: 'http://localhost:5000/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'email'] // Specify the fields you want to retrieve from Facebook
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if the user is already registered
    let user = await User.findOne({ facebookId: profile.id });

    if (!user) {
      // If user doesn't exist, register the user
      user = new User({
        facebookId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value // Assuming Facebook provides email in profile
      });
      await user.save();
    }

    // Pass the user to the next middleware
    done(null, user);
  } catch (error) {
    // If an error occurs during registration or authentication
    done(error);
  }
}));

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    // Deserialize the user from the database
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
