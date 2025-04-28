const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  verifyUser,
  dashboard,
  getAllUsers,
} = require("../controller/userController");
const {
  upload,
  create,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController");
const {
  stripeConfig,
  createPaymentIntent,
  saveStripeTransaction,
  getAllStripeTransaction,
} = require("../controller/stripeController");
const {
  chapaConfig,
  saveChapaTransaction,
  getAllChapaTransaction,
} = require("../controller/chapaController");
const { subscribe } = require("../controller/subscribeController");
const {
  saveRegistrationData,
  getRegisteredUsers,
  getRegisteredUserById,
} = require("../controller/registerController");
const { saveMessage, getMessages } = require("../controller/messageController");
const {
  forgotPassword,
  ResetPassword,
} = require("../controller/forgotPasswordController");

// Authentication Routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/dashboard", verifyUser, dashboard);
router.get("/getallusers", getAllUsers);

// Blog Routes
router.post("/create", upload.single("file"), create);
router.get("/getblogs", getBlogs);
router.get("/getblogbyid/:id", getBlogById);
router.put("/updateblog/:id", updateBlog);
router.delete("/deleteblog/:id", deleteBlog);

// Stripe Payment Routes
router.get("/stripe-config", stripeConfig);
router.post("/create-payment-intent", createPaymentIntent);
router.post("/save-stripe-transaction", saveStripeTransaction);
router.get("/get-stripe-transactions", getAllStripeTransaction);

// Chapa Payment Routes
router.get("/chapa-config", chapaConfig);
router.post("/save-chapa-transaction", saveChapaTransaction);
router.get("/get-chapa-transactions", getAllChapaTransaction);

// Email subscription Routes
router.post("/subscribe", subscribe);

// Registration Routes
router.post("/register", saveRegistrationData);
router.get("/get-registered-users", getRegisteredUsers);
router.get("/get-registered-users/:id", getRegisteredUserById);

// Message Routes
router.post("/send-message", saveMessage);
router.get("/get-all-messages", getMessages);

// Forgot Password Route
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", ResetPassword);

module.exports = router;
