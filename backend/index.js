// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const stripe = require('stripe')('sk_test_...'); // Your Stripe secret key
const { v4: uuidv4 } = require('uuid');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 8282;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("HELLO ITS WORKING");
});

// Updated Stripe payment endpoint
app.post("/payment", async (req, res) => {
  const { productId, token } = req.body; // Accept product ID from request body
  console.log("PRODUCT ID", productId);
  
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const charge = await stripe.charges.create({
      amount: productId.price * 100, // amount in cents
      currency: 'usd',
      customer: customer.id,
      receipt_email: token.email,
      description: productId.name
    }, { idempotencyKey: uuidv4() });

    res.status(200).json(charge);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Auth routes
app.use('/auth', authRoutes);

// Start server
app.listen(PORT, () => console.log(`LISTENING AT PORT ${PORT}`));
