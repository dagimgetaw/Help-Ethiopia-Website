import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../Spinner/Spinner";

export default function ViewBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/deleteblog/${id}`);
      if (res.data.success) {
        navigate("/admin/blogs");
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!blog) {
    return (
      <div className="text-center pt-30">
        <h2 className="pt-60 text-red-500">Blog not found.</h2>
      </div>
    );
  }

  return (
    <div className="pt-30 text-center bg-gray-100 font-text">
      <h2 className="pt-60">{blog.title}</h2>
      <p>{blog.description}</p>
      <div className="pt-8 flex gap-20">
        <Link to={`/admin/blogs/update/${blog._id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={(e) => handleDelete(blog._id)}>Delete</button>
      </div>
    </div>
  );
}
