const subscribeModel = require("../models/subscribeModel");

const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    const existingSubscriber = await subscribeModel.findOne({ email });
    if (existingSubscriber) {
      return res.status(200).json({
        success: true,
        message: "You are already subscribed!",
        subscribedBefore: true,
      });
    }

    // Save to database
    const newSubscriber = new subscribeModel({ email });
    await newSubscriber.save();

    res.status(201).json({
      success: true,
      message: "Subscription successful!",
      newSubscriber: true,
    });
  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

module.exports = { subscribe };
