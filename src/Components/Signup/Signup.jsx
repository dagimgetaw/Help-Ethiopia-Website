import { Link } from "react-router-dom";
import { Mail, LockKeyhole, User, Eye, EyeClosed } from "lucide-react";
import google from "../../assets/google.png";
import { useState } from "react";

export default function Signup() {
  const [hide, setHide] = useState(true);
  return (
    <div className="pt-40 pb-20 min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-text">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800">
        Sign Up
      </h2>
      <div className="max-w-md w-full space-y-9">
        <div className="mt-8 space-y-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 shadow-md rounded-lg border border-gray-300 bg-white p-3">
              <User className="text-gray-500" />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-3 shadow-md rounded-lg border border-gray-300 bg-white p-3">
              <User className="text-gray-500" />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
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
                type={hide ? "password" : "text"}
                name="password"
                placeholder="Password"
                className="w-full outline-none text-gray-700 placeholder-gray-400"
              />
              {hide ? (
                <EyeClosed
                  className="text-gray-500 cursor-pointer"
                  onClick={() => setHide(!hide)}
                />
              ) : (
                <Eye
                  className="text-gray-500 cursor-pointer"
                  onClick={() => setHide(!hide)}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-3 shadow-md rounded-lg border border-gray-300 bg-white p-3">
              <LockKeyhole className="text-gray-500" />
              <input
                type={hide ? "password" : "text"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full outline-none text-gray-700 placeholder-gray-400"
              />
              {hide ? (
                <EyeClosed
                  className="text-gray-500 cursor-pointer"
                  onClick={() => setHide(!hide)}
                />
              ) : (
                <Eye
                  className="text-gray-500 cursor-pointer"
                  onClick={() => setHide(!hide)}
                />
              )}
            </div>
          </div>
          <button className="w-full py-3 mt-6 rounded-lg bg-[#1E3A8A] text-white font-semibold hover:bg-blue-700 transition duration-300 cursor-pointer">
            Create account
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
              Sign up with Google
            </span>
          </button>
        </div>
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to={"/login"}>
            <span className="text-[#1E3A8A] font-semibold hover:underline cursor-pointer">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
