require("dotenv").config();
const mongoose = require("mongoose");
const name = process.env.DB_NAME;
const url =
  `mongodb://localhost:27017/${name}` || `mongodb://127.0.0.1:27017/${name}`;

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("database connected successfully");
  } catch (error) {
    console.error("database connection failed", error);
  }
};

module.exports = connectDB;
