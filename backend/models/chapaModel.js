const mongoose = require("mongoose");

const ChapaPaymentSchema = new mongoose.Schema(
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
    phoneNumber: {
      type: String,
    },
    amount: {
      type: Number,
    },
    currency: {
      type: String,
      default: "ETB",
    },
    tx_ref: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ChapaPayment = mongoose.model("ChapaPayments", ChapaPaymentSchema);

module.exports = ChapaPayment;
