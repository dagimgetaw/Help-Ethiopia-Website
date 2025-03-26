const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    file: String,
    date: String,
    time: String,
  },
  { timestamps: true }
);

const blogModel = mongoose.model("blogs", blogSchema);
module.exports = blogModel;
