import logo from "../../assets/logo.webp";
import { Youtube } from "lucide-react";

export default function YoutubeChannel() {
  return (
    <div className="pt-15 px-25 bg-gray-100 font-text">
      <div className="px-10 py-12 rounded-3xl border bg-white shadow-lg flex flex-col md:flex-row items-center md:items-start gap-6 border-gray-200">
        <img
          src={logo}
          alt="Help Ethiopia Logo"
          className="w-20 h-auto md:w-28"
        />

        <div className="flex flex-col flex-1 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center">
            Watch Our YouTube Channel
          </h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base leading-relaxed text-center">
            Stay updated with our latest content, tutorials, and inspiring
            stories. Subscribe now to support our mission!
          </p>
        </div>

        <button className="py-3 px-6 flex items-center mt-4 gap-2 rounded-xl bg-red-600 text-white text-lg font-medium cursor-pointer transition-all duration-300 hover:bg-red-700 hover:scale-105 shadow-md">
          <Youtube className="text-2xl" /> Subscribe
        </button>
      </div>
    </div>
  );
}
