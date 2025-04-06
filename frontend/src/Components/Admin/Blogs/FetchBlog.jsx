import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Pencil,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function FetchBlog() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [deleteBlogId, setDeleteBlogId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/getblogs");
        setBlogs(response.data);
        setFilteredBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to fetch blogs. Please try again later.");
      } finally {
        setLoading(false);
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
        setFilteredBlogs(
          filteredBlogs.filter((blog) => blog._id !== deleteBlogId)
        );
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
    setDeleteBlogId(null);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredBlogs(
      blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(term) ||
          blog.description.toLowerCase().includes(term)
      )
    );
    setCurrentPage(1); // Reset to the first page after search
  };

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="font-text">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Blog Management
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full pl-10 pr-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentBlogs.map((blog) => (
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
              <p className="text-gray-700 text-base mb-4">
                {truncateDescription(blog.description)}
              </p>
              <div className="flex justify-between text-sm text-gray-600 pb-4">
                <p>{blog.time} min read</p>
                <p>{blog.date}</p>
              </div>
              <div className="flex justify-between mt-4">
                <Link
                  to={`/admin/blogs/${blog._id}`}
                  className="text-blue-600 font-semibold underline"
                >
                  Read more
                </Link>
                <div className="flex gap-2">
                  <Link
                    to={`/admin/blogs/update/${blog._id}`}
                    className="flex items-center gap-2 py-1 px-3 rounded-lg text-sm bg-blue-500 text-white hover:bg-blue-600"
                  >
                    <Pencil size={16} /> Edit
                  </Link>
                  <button
                    onClick={() => setDeleteBlogId(blog._id)}
                    className="flex items-center gap-2 py-1 px-3 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteBlogId && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this blog post?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteBlogId(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
