require('dotenv').config(); // Load environment variables
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
const cors = require('cors');
const mongoose = require('mongoose');
const Payment = require('../models/Payment');
const User = require('../models/User'); // Assuming your Payment model is exported from models/Payment.js

// Middleware to parse JSON bodies
router.use(express.json());
router.use(cors());

// Route to create a Stripe Checkout session
router.post('/checkout', async (req, res) => {
  try {
      const userId = req.body.userId;
      const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [{
              price_data: {
                  currency: 'usd',
                  product_data: {
                      name: 'Scheduled Post',
                  },
                  unit_amount: 10000, // Price in cents
              },
              quantity: 1,
          }],
          mode: 'payment',
          success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&userId=${userId}`, // Updated success URL
          cancel_url: `${process.env.BASE_URL}/cancel`,
      });

      // Calculate the total amount paid
      const totalAmountPaid = 10 * 1;

      // Create a new payment record in the database
      const payment = new Payment({
          userID: userId,
          amount: totalAmountPaid,
          currency: 'USD',
          status: 'pending', // Initial status
          sessionID: session.id, // Store the session ID
      });
      await payment.save();

      // Send both the session ID and URL as JSON
      res.json({ id: session.id, url: session.url });
  } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).send('Failed to create checkout session');
  }
});

// Route to handle successful payments
router.get('/complete', async (req, res) => {
  try {
    const { session_id, userId } = req.query;
    console.log('Received session_id:', session_id, 'userId:', userId);

    if (!session_id || !userId) {
      console.log('Missing session_id or userId');
      return res.status(400).send('Missing session_id or userId');
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['payment_intent.payment_method']
    });

    console.log('Stripe session retrieved:', session);

    const paymentRecord = await Payment.findOne({ sessionID: session_id });
    if (!paymentRecord) {
      console.log('Payment record not found');
      return res.status(404).send('Payment record not found');
    }

    let paymentStatus = 'failed';
    if (session.payment_status === 'paid') {
      paymentRecord.status = 'completed';
      paymentStatus = 'completed';
    }
    await paymentRecord.save();

    console.log('Payment record updated:', paymentRecord);

    await User.findByIdAndUpdate(userId, { usertype: 'premium' });

    res.status(200).json({
      status: paymentStatus,
      redirectUrl: `${process.env.BASE_URL}/dashboard`
    });
  } catch (error) {
    console.error('Error processing payment completion:', error);
    res.status(500).send('An error occurred during payment completion.');
  }
});

  // Route to verify payment status

// Example Express route to get user details
router.get('/verify/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('An error occurred while fetching user details');
  }
});



// Route to handle cancellations
router.get('/cancel', (req, res) => {
    res.send('Payment canceled.');
});

module.exports = router;