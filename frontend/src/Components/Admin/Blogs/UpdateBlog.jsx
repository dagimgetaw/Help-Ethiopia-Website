import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Edit3, FileText, Timer } from "lucide-react";
import axios from "axios";
import Spinner from "../../Spinner/Spinner";

export default function UpdateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.put(`http://localhost:3000/updateblog/${id}`, {
        title,
        description,
        time,
      });

      if (res.data.success) {
        navigate("/admin/blogs");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update blog");
      console.error(
        "Error updating blog:",
        error.response?.data || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/getblogbyid/${id}`
        );
        setBlog(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setTime(response.data.time);
      } catch (error) {
        setError("Failed to fetch blog details");
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (isLoading) return <Spinner />;

  return (
    <div className="pt-30 min-h-screen bg-gray-50 font-text px-4 sm:px-6 pb-10 sm:pb-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 sm:mt-6 text-gray-900 pb-4 sm:pb-6 text-center">
          Update Blog
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
            {error}
          </div>
        )}

        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 border border-gray-200">
          <form
            className="flex flex-col space-y-4 sm:space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="relative flex items-center gap-3 shadow-sm rounded-lg border border-gray-300 bg-white p-3 sm:p-4 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300">
              <Edit3 className="text-gray-500 flex-shrink-0" size={20} />
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blog's Title"
                className="w-full outline-none text-gray-800 text-base sm:text-lg placeholder-gray-400 bg-transparent"
                required
              />
            </div>

            <div className="relative flex items-start gap-3 shadow-sm rounded-lg border border-gray-300 bg-white p-3 sm:p-4 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300">
              <FileText
                className="text-gray-500 flex-shrink-0 mt-1"
                size={20}
              />
              <textarea
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Blog description..."
                rows="6"
                className="w-full outline-none text-gray-800 text-base sm:text-lg placeholder-gray-400 bg-transparent resize-y min-h-[150px]"
                required
              />
            </div>

            <div className="relative flex items-center gap-3 shadow-sm rounded-lg border border-gray-300 bg-white p-3 sm:p-4 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300">
              <Timer className="text-gray-500 flex-shrink-0" size={20} />
              <input
                type="text"
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Time take's to read"
                className="w-full outline-none text-gray-800 text-base sm:text-lg placeholder-gray-400 bg-transparent"
                required
              />
            </div>

            <button
              className="w-full py-2 sm:py-3 mt-4 sm:mt-6 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white text-base sm:text-lg font-semibold cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Blog"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
