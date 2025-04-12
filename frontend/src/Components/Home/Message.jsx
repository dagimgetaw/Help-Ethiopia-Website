import { Link } from "react-router-dom";

export default function Message() {
  return (
    <div className="py-16 px-6 md:px-12 lg:px-24 bg-gray-100 font-text">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4 text-center">
        Register your company as our donor or sponsor and make a lasting impact.
      </h2>
      <div className="flex justify-center pt-4">
        <Link to={"/register"}>
          <button className="cursor-pointer py-2 px-12 m-auto font-text text-xl bg-blue-600 hover:bg-blue-700 rounded-lg text-white">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
