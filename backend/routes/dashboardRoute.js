require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Posts = require('../models/Post');

// Fetch profile information
router.get('/profile', async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log('Received userId:', userId);

    if (!userId) {
      return res.status(400).send('UserId query parameter is required');
    }

    const user = await User.findOne({ _id: userId, role: { $ne: 'admin' } });
    if (!user) {
      console.log('User not found with userId:', userId);
      return res.status(404).send('User not found');
    }

    res.send(user);
  } catch (error) {
    console.error('Error fetching profile information:', error.message); 
    res.status(500).send('Error fetching profile information');
  }
});

// Update profile image
router.put('/upload', async (req, res) => {
  const { imageUrl, userId } = req.body;
  console.log(imageUrl, userId);

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { imageUrl: imageUrl } },
      { new: true }
    );

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.send(user);
  } catch (error) {
    console.error('Error updating profile image:', error);
    res.status(500).send('Error updating profile image');
  }
});

//Edit profile
router.put('/editProfile', async (req, res) => {
  const userId = req.query.userId;
  const { firstName, lastName, organizationName, email, phone } = req.body.profileData;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          organizationName: organizationName,
          email: email,
          phone: phone
        }
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.send(user);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send('Error updating profile');
  }
});

//Delete Profile Image
router.delete('/deleteImage', async (req, res) => {
  const userId = req.query.userId;

  try {
    if (!userId) {
      return res.status(400).send('UserId query parameter is required');
    }
    const result = await User.findOneAndUpdate(
      { _id: userId },
      { $unset: { imageUrl: "" } },
      { new: true }
    );

    if (!result) {
      return res.status(404).send('User not found');
    }

    res.send(result);
  } catch (error) {
    console.error('Error deleting image URL:', error);
    res.status(500).send('Error deleting image URL');
  }
});

// Add this route to your Express server
router.patch('/users/:userId/remove-premium', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find the user and update the usertype
    const user = await User.findByIdAndUpdate(userId, { usertype: 'free' }, { new: true });
    
    if (!user) {
      return res.status(404).send('User not found');
    }
    
    res.status(200).json({ message: 'User type updated to free', user });
  } catch (error) {
    console.error('Error updating user type:', error);
    res.status(500).send('An error occurred while updating user type');
  }
});

// Change password route
router.post('/change_password', async (req, res) => {
  try {
    const {oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req.body.userId; // Assuming this is passed correctly from the frontend
    console.log(oldPassword,newPassword,confirmPassword);
    console.log(userId);

    // Validate input
    if (!userId || !oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Find the user by _id
    const user = await User.findById(userId); // Use findById instead of findOne
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Verify the old password
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return res.status(401).json({ message: 'Invalid old password.' });
    }

    // Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
