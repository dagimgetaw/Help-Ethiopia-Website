import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Clock, CalendarDays, ArrowRight } from "lucide-react";

export default function RecentPosts() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/getblogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load recent posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const truncateDescription = (description) => {
    if (!description) return "";
    return description.length > 120
      ? description.substring(0, 120) + "..."
      : description;
  };

  const displayedBlogs = showAll ? blogs : blogs.slice(0, 3);

  if (error) {
    return (
      <div className="py-16 px-4 text-center bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="pb-16 px-4 sm:px-6 lg:px-8 bg-gray-100 font-text">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Recent Posts
          </h2>
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
                      to={`/blogs/${blog._id}`}
                      className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Read more
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
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
      </div>
    </section>
  );
}
