import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Recent() {
  const [blogs, setBlogs] = useState([]);

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

  // Function to truncate the description if it's more than 30 characters
  const truncateDescription = (description) => {
    return description.length > 120
      ? description.substring(0, 120) + "..."
      : description;
  };

  return (
    <div className="pt-15 px-25 bg-gray-100 font-text">
      <p className="text-center text-gray-800 text-lg font-semibold mb-6 ">
        <span className="border-b-1 border-gray-800">Recent Posts</span>
      </p>
      <div className="pt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 mt-6">
        {blogs.map((data) => (
          <div
            key={data.title}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={`http://localhost:3000/Images/${data.file}`}
              alt={data.title}
              className="w-full h-48 object-cover "
            />
            <div className="p-2">
              <h3 className="text-xl text-center font-semibold text-gray-900 pt-2 pb-2">
                {data.title}
              </h3>
              <div className="px-2">
                <p className="text-gray-700 text-base mb-4 pt-4">
                  {truncateDescription(data.description)}{" "}
                </p>
                <div className="flex">
                  <p className="text-sm text-gray-600 pb-4">
                    {data.time} min read.
                  </p>
                  <p className="text-sm text-gray-600 pb-4 ml-auto">
                    {data.date}
                  </p>
                </div>
                <Link
                  to={`/blogs/${data._id}`}
                  className="text-[#1E3A8A] font-semibold underline cursor-pointer font-text text-base md:text-md"
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
