const mongoose = require("mongoose");

const subscribeSchema = new mongoose.Schema(
  {
    email: {
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

const subscribeModel = mongoose.model("Subscriber", subscribeSchema);
module.exports = subscribeModel;
