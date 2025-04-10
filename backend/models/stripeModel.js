const mongoose = require("mongoose");

const StripePaymentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP"],
      default: "USD",
      uppercase: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const stripeModel = mongoose.model("StripePayment", StripePaymentSchema);

module.exports = stripeModel;
