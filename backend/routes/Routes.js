const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  verifyUser,
  dashboard,
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
  config,
  createPaymentIntent,
} = require("../controller/stripeController");

// Authentication Routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/dashboard", verifyUser, dashboard);

// Blog Routes
router.post("/create", upload.single("file"), create);
router.get("/getblogs", getBlogs);
router.get("/getblogbyid/:id", getBlogById);
router.put("/updateblog/:id", updateBlog);
router.delete("/deleteblog/:id", deleteBlog);

// Stripe Payment Routes
router.get("/config", config);
router.post("/create-payment-intent", createPaymentIntent);

module.exports = router;
