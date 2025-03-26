import { useState } from "react";
import { Upload, Edit3, FileText, Timer } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [time, setTime] = useState("");

  const formattedDate = new Date().toLocaleDateString("en-GB");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("date", formattedDate);
    formData.append("time", time);

    try {
      const res = await axios.post("http://localhost:3000/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        navigate("/admin/blogs");
      }
    } catch (error) {
      console.log(
        "Error uploading blog:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="pt-30 min-h-screen flex flex-col items-center bg-gray-50 font-text px-4 pb-20 relative">
      <h2 className="text-4xl md:text-5xl font-bold mt-6 text-gray-900 pb-6">
        Create a Blog
      </h2>
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6 md:p-8 border border-gray-200">
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="relative flex items-center gap-3 shadow-sm rounded-lg border border-gray-300 bg-white p-4 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300">
            <Edit3 className="text-gray-500" size={24} />
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog's Title"
              className="w-full outline-none text-gray-800 text-lg placeholder-gray-400 bg-transparent"
            />
          </div>
          <div className="relative flex items-start gap-3 shadow-sm rounded-lg border border-gray-300 bg-white p-4 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300">
            <FileText className="text-gray-500" size={24} />
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Blog description..."
              rows="6"
              className="w-full outline-none text-gray-800 text-lg placeholder-gray-400 bg-transparent resize-y"
            />
          </div>
          <div className="relative flex items-center gap-3 shadow-sm rounded-lg border border-gray-300 bg-white p-4 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300">
            <Timer className="text-gray-500" size={24} />
            <input
              type="text"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Time take's to read"
              className="w-full outline-none text-gray-800 text-lg placeholder-gray-400 bg-transparent"
            />
          </div>
          <div className="relative flex items-center gap-3 shadow-sm rounded-lg border border-gray-300 bg-white p-4 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300 cursor-pointer">
            <Upload className="text-gray-500" size={24} />
            <input
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full outline-none text-gray-800 text-lg placeholder-gray-400 bg-transparent cursor-pointer"
            />
          </div>
          {file && (
            <p className="text-sm text-gray-600 text-center">
              Selected File: {file.name}
            </p>
          )}
          <button
            className="w-full py-3 mt-6 rounded-lg bg-gradient-to-r bg-[#1E3A8A] text-white text-lg font-semibold cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105"
            type="submit"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
