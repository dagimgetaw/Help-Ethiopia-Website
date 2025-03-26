import { Link } from "react-router-dom";
import AdminViewBlog from "./FetchBlog";

export default function NewBlog() {
  return (
    <div className="pt-20 px-10 font-text bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <AdminViewBlog />
        <div className="mt-12 p-8 bg-white rounded-lg shadow-lg border border-gray-200 flex justify-between items-center">
          <div className="">
            {" "}
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Create a New Blog
            </h2>
            <p className="text-gray-600 mb-6">
              Want to share your thoughts with the world? Start by creating a
              new blog post.
            </p>
          </div>
          <div className="mr-10">
            {" "}
            <Link to="/admin/blogs/create">
              <button className="transition-all duration-300 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 cursor-pointer">
                Create Blog
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
