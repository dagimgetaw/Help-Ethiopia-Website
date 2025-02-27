import { Link } from "react-router-dom";
import { Mail, LockKeyhole } from "lucide-react";
import google from "../../assets/google.png";

export default function Login() {
  return (
    <div className="pt-40 pb-20 min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-text">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800">
        Login
      </h2>
      <div className="max-w-md w-full space-y-2">
        <div className="mt-2 space-y-6">
          <div className="flex flex-col"></div>
          <div className="flex flex-col"></div>
          <div className="flex flex-col">
            <div className="flex items-center gap-3 shadow-md rounded-lg border border-gray-300 bg-white p-3">
              <Mail className="text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-3 shadow-md rounded-lg border border-gray-300 bg-white p-3">
              <LockKeyhole className="text-gray-500" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
          <button className="w-full py-3 mt-6 rounded-lg bg-[#1E3A8A] text-white font-semibold hover:bg-blue-700 transition duration-300 cursor-pointer">
            Login
          </button>
        </div>
        <div className="flex items-center my-6">
          <div className="border-t border-gray-300 flex-grow"></div>
          <p className="mx-4 text-gray-500">Or</p>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>
        <div className="flex justify-center">
          <button className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition duration-300 cursor-pointer">
            <img src={google} alt="Google" className="w-6 h-6" />
            <span className="text-gray-700 font-medium">
              Login in with Google
            </span>
          </button>
        </div>
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link to={"/signup"}>
            <span className="text-[#1E3A8A] font-semibold hover:underline cursor-pointer">
              Create account
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
