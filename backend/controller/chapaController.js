require("dotenv").config();
const chapaModel = require("../models/chapaModel");

const ChapaConfig = (req, res) => {
  res.send({ publishableKey: process.env.CHAPA_PUBLIC_KEY });
};

const saveChapaTransaction = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, amount, tx_ref } =
      req.body;

    // Save to database
    const newTransaction = new chapaModel({
      firstName,
      lastName,
      email,
      phoneNumber,
      amount,
      tx_ref,
    });
    await newTransaction.save();

    res.status(201).json({
      success: true,
      message: "Donation successful!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { ChapaConfig, saveChapaTransaction };
