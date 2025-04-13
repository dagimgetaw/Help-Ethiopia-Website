import logo from "../../assets/logo.webp";
import { Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export default function YoutubeChannel() {
  return (
    <div className="pb-16 px-4 sm:px-6 lg:px-8 bg-gray-100 font-text">
      <div className="max-w-7xl mx-auto">
        <div className="px-8 py-10 rounded-3xl bg-white shadow-lg border border-gray-200 flex flex-col md:flex-row items-center gap-8 transition-all duration-300 hover:shadow-xl">
          <div className="relative">
            <img
              src={logo}
              alt="Help Ethiopia Logo"
              className="w-20 h-auto md:w-28 transition-transform duration-300 "
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-800">
              Join Our YouTube Community
            </h2>
            <p className="text-gray-600 mt-6 md:mt-2 text-base leading-relaxed">
              Stay updated with our latest content, tutorials, and inspiring
              stories. Subscribe now to support our mission!
            </p>
          </div>

          <Link
            to="https://youtube.com/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group mt-4 md:mt-0"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-xl blur opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
            <button className="relative py-4 px-8 flex items-center gap-3 rounded-xl bg-red-600 text-white text-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-red-700 hover:scale-105 shadow-lg">
              <Youtube className="w-6 h-6" />
              <span>Subscribe Now</span>
              <span className="absolute -right-2 -top-2 bg-white text-red-600 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                +
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
