const mongoose = require("mongoose");

const ChapaPaymentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    amount: {
      type: Number,
      required: true,
      min: [0.5, "Donation amount must be at least $0.50"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP"],
      default: "USD",
      uppercase: true,
    },
    status: {
      type: String,
      enum: ["pending", "succeeded", "failed"],
      default: "pending",
    },
    paymentIntentId: { type: String, required: true, unique: true },
    clientSecret: { type: String, required: true },
    paymentMethodId: { type: String },
  },
  { timestamps: true }
);

const ChapaPayment = mongoose.model("ChapaPayment", ChapaPaymentSchema);

module.exports = ChapaPayment;
