import { Link } from "react-router-dom";
import AdminViewBlog from "./FetchBlog";

export default function NewBlog() {
  return (
    <div className="pt-20 font-text bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <AdminViewBlog />
        <div className="mt-8 sm:mt-12 p-4 sm:p-8 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-4">
                Create a New Blog
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Want to share your thoughts with the world? Start by creating a
                new blog post.
              </p>
            </div>
            <div className="w-full sm:w-auto">
              <Link to="/admin/blogs/create" className="block w-full sm:w-auto">
                <button className="w-full sm:w-auto transition-all duration-300 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 cursor-pointer text-sm sm:text-base">
                  Create Blog
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
