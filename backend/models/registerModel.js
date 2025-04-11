const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    birthYear: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    employmentStatus: {
      type: String,
      required: true,
    },
    fieldOfWork: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
      required: true,
    },
    interests: {
      type: [String],
      required: true,
    },
    agreement: {
      type: Boolean,
      required: true,
    },
    registrationType: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const registerModel = mongoose.model("registeredUsers", registerSchema);
module.exports = registerModel;
