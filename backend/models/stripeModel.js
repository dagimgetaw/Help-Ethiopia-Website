const mongoose = require("mongoose");

const StripePaymentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    country: {
      type: String,
    },
    amount: {
      type: Number,
    },
    currency: {
      type: String,
    },
    transactionId: {
      type: String,
      unique: true,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const StripePayment = mongoose.model("StripePayments", StripePaymentSchema);

module.exports = StripePayment;
