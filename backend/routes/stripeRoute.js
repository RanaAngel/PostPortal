require('dotenv').config(); // Load environment variables
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
const cors = require('cors');
const mongoose = require('mongoose');
const Payment = require('../models/Payment'); // Assuming your Payment model is exported from models/Payment.js

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
                    unit_amount: 1000, // Price in cents
                },
                quantity: 1,
            }],
            mode: 'payment',
            // success_url: `${process.env.BASE_URL}/complete?session_id={CHECKOUT_SESSION_ID}&userId=${userId}`, // Updated success URL
            success_url: `${process.env.BASE_URL}/dashboard`, // Updated success URL
            cancel_url: `${process.env.BASE_URL}/cancel`,
        });

        // Calculate the total amount paid
        // const totalAmountPaid = session.line_items.data[0].price.unit_amount* session.line_items.data[0].quantity;
        const totalAmountPaid = 10*1;

        // Create a new payment record in the database
        const payment = new Payment({
            userID: userId,
            amount: totalAmountPaid,
            currency: 'USD',
            status: 'completed', // Initial status
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
      const userId = req.body.userId;
      const session = await stripe.checkout.sessions.retrieve(req.query.session_id, {
        expand: ['payment_intent.payment_method']
      });
  
      // Find the payment record by session ID
      const paymentRecord = await Payment.findOne({ sessionID: req.query.session_id });
      if (!paymentRecord) {
        return res.status(404).send('Payment record not found');
      }
  
      // Update the payment status based on the session outcome
      let paymentStatus = 'failed'; // Default status
      if (session.payment_status === 'paid') {
        paymentRecord.status = 'completed';
        paymentStatus = 'completed';
      } else {
        paymentRecord.status = 'failed'; // Or 'pending' if you want to keep it pending until manual review
      }
      await paymentRecord.save();
  
      res.redirect(`https://localhost:3000/dashboard?userId=${userId}&status=${paymentStatus}`);
    } catch (error) {
      console.error('Error retrieving session:', error);
      res.status(500).send('An error occurred during payment completion.');
    }
  });
  // Route to verify payment status

router.get('/verify', async (req, res) => {
  try {
      const userId = req.query.userId; // Get userId from query parameters
      if (!userId) {
          return res.status(400).json({ error: 'User ID is required' });
      }

      // Find the most recent payment record for the user
      const paymentRecord = await Payment.findOne({ userID: userId }).sort({ createdAt: -1 });
      if (!paymentRecord) {
          return res.status(404).json({ status: 'No payment record found' });
      }

      // Send the payment status as response
      res.json({ status: paymentRecord.status });
  } catch (error) {
      console.error('Error verifying payment status:', error);
      res.status(500).send('An error occurred while verifying payment status.');
  }
});



// Route to handle cancellations
router.get('/cancel', (req, res) => {
    res.send('Payment canceled.');
});

module.exports = router;
