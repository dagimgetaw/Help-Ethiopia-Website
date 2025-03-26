import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

export default function FetchBlog() {
  const [blogs, setBlogs] = useState([]);
  const [deleteBlogId, setDeleteBlogId] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getblogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (deleteBlogId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [deleteBlogId]);

  const truncateDescription = (description) => {
    return description.length > 120
      ? description.substring(0, 120) + "..."
      : description;
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/deleteblog/${deleteBlogId}`
      );
      if (res.data.success) {
        setBlogs(blogs.filter((blog) => blog._id !== deleteBlogId));
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
    setDeleteBlogId(null);
  };

  return (
    <div className="pt-10 font-text">
      <p className="text-center text-gray-800 text-lg font-semibold mb-6">
        <span className="border-b-1 border-gray-800">View Posts</span>
      </p>
      <div className="pt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 mt-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={`http://localhost:3000/Images/${blog.file}`}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl text-center font-semibold text-gray-900 pt-2 pb-2">
                {blog.title}
              </h3>
              <div className="px-2">
                <p className="text-gray-700 text-base mb-4 pt-4">
                  {truncateDescription(blog.description)}
                </p>
                <div className="flex justify-between text-sm text-gray-600 pb-4">
                  <p>{blog.time} min read</p>
                  <p>{blog.date}</p>
                </div>
                <div className="py-2">
                  <Link
                    to={`/admin/blogs/${blog._id}`}
                    className="text-[#1E3A8A] font-semibold underline text-base"
                  >
                    Read more
                  </Link>
                </div>
                <div className="flex justify-evenly mt-6">
                  <Link
                    to={`/admin/blogs/update/${blog._id}`}
                    className="flex items-center gap-2 py-2 px-4 rounded-lg text-sm transition-all duration-300 bg-[#1E3A8A] text-white cursor-pointer"
                  >
                    <Pencil size={16} /> Edit
                  </Link>
                  <button
                    onClick={() => setDeleteBlogId(blog._id)}
                    className="flex items-center gap-2 py-2 px-4 rounded-lg text-sm transition-all duration-300 bg-red-600 text-white cursor-pointer"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {deleteBlogId && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="absolute inset-0 grayscale-10 bg-opacity-50 backdrop-blur-sm"></div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center border border-gray-300 z-10">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this blog post?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteBlogId(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
