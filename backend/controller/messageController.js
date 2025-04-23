const messageModel = require("../models/messageModel");

const saveMessage = async (req, res) => {
  try {
    const { fullName, email, message } = req.body.values || req.body;

    const newMessage = new messageModel({
      fullName,
      email,
      message,
    });
    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await messageModel.find();
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

module.exports = { saveMessage, getMessages };
