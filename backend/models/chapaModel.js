const mongoose = require("mongoose");

const ChapaPaymentSchema = new mongoose.Schema(
  {
    tx_ref: {
      type: String,
      required: true,
      unique: true,
    },
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
    phoneNumber: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
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
  },
  { timestamps: true }
);

const ChapaPayment = mongoose.model("ChapaPayment", ChapaPaymentSchema);

module.exports = ChapaPayment;
