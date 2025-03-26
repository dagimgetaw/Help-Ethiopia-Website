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

router.post("/signup", signup);
router.post("/login", login);
router.get("/dashboard", verifyUser, dashboard);

router.post("/create", upload.single("file"), create);
router.get("/getblogs", getBlogs);
router.get("/getblogbyid/:id", getBlogById);
router.put("/updateblog/:id", updateBlog);
router.delete("/deleteblog/:id", deleteBlog);

module.exports = router;
