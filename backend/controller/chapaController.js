require("dotenv").config();
const chapaModel = require("../models/chapaModel");

const chapaConfig = (req, res) => {
  res.send({ publishableKey: process.env.CHAPA_PUBLIC_KEY });
};

const saveChapaTransaction = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, amount, tx_ref } =
      req.body;

    const newTransaction = new chapaModel({
      firstName,
      lastName,
      email,
      phoneNumber,
      amount,
      currency: "ETB",
      tx_ref,
    });

    await newTransaction.save();

    res.status(201).json({
      success: true,
      message: "Donation successful!",
      data: newTransaction,
    });
  } catch (error) {
    console.error("Error saving transaction:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to save transaction",
    });
  }
};

const getAllChapaTransaction = async (req, res) => {
  try {
    const payment = await chapaModel.find();
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chapa payment" });
  }
};

module.exports = { chapaConfig, saveChapaTransaction, getAllChapaTransaction };
