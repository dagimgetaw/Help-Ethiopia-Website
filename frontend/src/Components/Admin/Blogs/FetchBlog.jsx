import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Pencil,
  Trash2,
  Search,
  Clock,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import Spinner from "../../Spinner/Spinner";

export default function FetchBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [deleteBlogId, setDeleteBlogId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    if (!description) return "";
    return description.length > 120
      ? description.substring(0, 120) + "..."
      : description;
  };

  const displayedBlogs = showAll ? blogs : blogs.slice(0, 3);

  if (error) {
    return (
      <div className="py-16 px-4 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

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
  };

  if (loading) return <Spinner />;

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
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
            >
              <div className="bg-gray-200 h-48 w-full"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
                <div className="flex justify-between mt-6">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedBlogs.map((blog) => (
              <article
                key={blog._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={`http://localhost:3000/Images/${blog.file}`}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {truncateDescription(blog.description)}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center mr-4">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{blog.time} min read</span>
                    </div>
                    <div className="flex items-center ml-auto">
                      <CalendarDays className="w-4 h-4 mr-1" />
                      <span>{blog.date}</span>
                    </div>
                  </div>

                  <Link
                    to={`/admin/blogs/${blog._id}`}
                    className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Read more
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <div className="flex gap-2 mt-5">
                    <Link
                      to={`/admin/blogs/update/${blog._id}`}
                      className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                    >
                      <Pencil size={16} /> Edit
                    </Link>
                    <button
                      onClick={() => setDeleteBlogId(blog._id)}
                      className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {blogs.length > 3 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
              >
                {showAll ? "Show Less" : "Load More"}
                <ArrowRight
                  className={`w-4 h-4 ml-2 transition-transform ${
                    showAll ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          )}
        </>
      )}
      {/* Delete Confirmation Modal */}
      {deleteBlogId && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full mx-4">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this blog post?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteBlogId(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
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
