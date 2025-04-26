require("dotenv").config();
const stripModel = require("../models/stripeModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const stripeConfig = (req, res) => {
  res.send({ publishableKey: process.env.STRIPE_PUBLIC_KEY });
};

const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    return res.status(500).send({ error: { message: e.message } });
  }
};

const saveStripeTransaction = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      country,
      amount,
      currency,
      transactionId,
    } = req.body;

    const newTransaction = new stripModel({
      firstName,
      lastName,
      email,
      country,
      amount,
      currency: currency.toUpperCase(),
      transactionId,
    });

    await newTransaction.save();

    res.status(201).json({
      success: true,
      message: "Donation successful!",
      data: newTransaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Failed to save transaction",
    });
  }
};

module.exports = { stripeConfig, createPaymentIntent, saveStripeTransaction };
