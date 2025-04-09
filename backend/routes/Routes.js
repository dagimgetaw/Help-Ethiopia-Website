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
  StripeConfig,
  createPaymentIntent,
} = require("../controller/stripeController");
const {
  ChapaConfig,
  saveChapaTransaction,
} = require("../controller/chapaController");
const { subscribe } = require("../controller/subscribeController");

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
router.get("/stripe-config", StripeConfig);
router.post("/create-payment-intent", createPaymentIntent);

// Chapa Payment Routes
router.get("/chapa-config", ChapaConfig);
router.post("/save-chapa-payment", saveChapaTransaction);

// Email subscription Routes
router.post("/subscribe", subscribe);

module.exports = router;
