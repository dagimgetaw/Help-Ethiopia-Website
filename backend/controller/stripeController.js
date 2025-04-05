require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const config = (req, res) => {
  res.send({ publishableKey: process.env.STRIPE_PUBLIC_KEY });
};
const createPaymentIntent = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "eur",
      amount: req.body.amount || 1999,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    return res.status(500).send({ error: { message: e.message } });
  }
};

module.exports = { config, createPaymentIntent };
