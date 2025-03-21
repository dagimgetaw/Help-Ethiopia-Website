const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  verifyUser,
  dashboard,
} = require("../controller/userController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/dashboard", verifyUser, dashboard);

module.exports = router;
