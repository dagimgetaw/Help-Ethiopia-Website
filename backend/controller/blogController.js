const multer = require("multer");
const path = require("path");
const blogModel = require("../models/blogModel");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../Public/Images"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const create = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const result = await blogModel.create({
      title: req.body.title,
      description: req.body.description,
      file: req.file.filename,
      date: req.body.date,
      time: req.body.time,
    });
    res.status(201).json({
      message: "Blog created successfully",
      blog: result,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        description: req.body.description,
        time: req.body.time,
      },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res
      .status(200)
      .json({ message: "Blog updated successfully", blog, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res
      .status(200)
      .json({ message: "Blog deleted successfully", blog, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  upload,
  create,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
