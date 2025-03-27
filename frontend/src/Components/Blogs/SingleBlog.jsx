import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchBlog();
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <NotFound />;
  }

  if (!blog) {
    return <NotFound />;
  }

  return (
    <div className="pt-40 px-30 py-10 bg-gray-100">
      <div className="flex justify-center">
        <img
          src={`http://localhost:3000/Images/${blog.file}`}
          alt={blog.title}
          loading="lazy"
          className="w-1/2 h-fill object-cover "
          onError={(e) => (e.target.src = "/fallback-image.jpg")}
        />
      </div>
      <h2 className="text-4xl font-bold text-gray-900 mt-6 text-center">
        {blog.title}
      </h2>
      <p className="mt-4 text-gray-700 leading-relaxed text-lg text-justify">
        {blog.description}
      </p>
    </div>
  );
}
