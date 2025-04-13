import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Clock, CalendarDays } from "lucide-react";
import Spinner from "../Spinner/Spinner";
import NotFound from "../NotFound/NotFound";

export default function SingleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/getblogbyid/${id}`
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError(error.message);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    fetchBlog();
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !blog) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-100 font-text pt-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{blog.time} min read</span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="w-4 h-4 mr-2" />
              <span>{blog.date}</span>
            </div>
          </div>
        </header>

        <div className="mb-8 rounded-lg overflow-hidden shadow-md">
          <img
            src={`http://localhost:3000/Images/${blog.file}`}
            alt={blog.title}
            loading="lazy"
            className="w-full h-auto max-h-[500px] object-cover"
            onError={(e) => (e.target.src = "/fallback-image.jpg")}
          />
        </div>

        <div className="prose max-w-none text-gray-700">
          {blog.description.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Back to All Blogs
          </Link>
        </div>
      </article>
    </div>
  );
}
