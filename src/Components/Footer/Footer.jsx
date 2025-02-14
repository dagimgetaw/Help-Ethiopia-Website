import logo from "../../assets/l.jpg";
import { FaFacebook, FaTwitter, FaInstagram, FaTelegram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-12 px-10 w-full bg-gray-600 font-text">
      <div className="flex flex-col xl:flex-row justify-center">
        {/* Logo Section */}
        <div className="logo flex-1 text-center">
          <img
            src={logo}
            alt="Logo"
            className="xl:pl-20 mx-auto w-30 xl:mx-0 xl:w-40 h-auto"
          />
          <p className="text-white text-sm sm:text-md md:text-lg pt-6 text-center xl:text-left">
            We advocate for quality education, nurture leadership, and forge
            collaborations for sustainable healthcare.
          </p>
        </div>

        {/* Subscribe Section */}
        <div className="flex-1 text-center xl:pl-8 md:text-left pt-6 md:pt-0">
          <p className="text-white font-title text-lg md:text-xl pt-12 text-center">
            Subscribe
          </p>
          <p className="text-white text-md sm:text-lg pt-2 text-center">
            Sign up with your email address to receive news and updates.
          </p>
          <div className="flex pt-4 justify-center">
            <input
              type="text"
              placeholder="Your Email address"
              className="border w-md mb-2 my-2 pl-2 border-[#1E3A8A] p-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#1E3A8A] bg-white"
            />
            <button className="cursor-pointer my-2 px-8 border-0.5 border-[#F1C40F] rounded-r-md bg-[#F1C40F] text-white text-lg">
              Submit
            </button>
          </div>
        </div>

        {/* Social Icons Section */}
        <div className="flex flex-1 items-center justify-center pt-12">
          <FaFacebook className="m-4 text-5xl cursor-pointer text-[#F1C40F] rounded-xl" />
          <FaTwitter className="m-4 text-5xl cursor-pointer text-[#F1C40F] rounded-xl" />
          <FaInstagram className="m-4 text-5xl cursor-pointer text-[#F1C40F] rounded-xl" />
          <FaTelegram className="m-4 text-5xl cursor-pointer text-[#F1C40F] rounded-xl" />
        </div>
      </div>

      {/* Description Text */}
      <p className="pt-12 text-sm sm:text-md md:text-base leading-7 text-white ">
        HELP Ethiopia is a multi-disciplinary organization registered and
        accorded legal personality in Ethiopia. We have a dedicated charity
        program targeting economically disadvantaged groups of our society,
        known as Ye’Eteye Charity. Furthermore, we advocate for quality
        education, leadership, and collaboration as a tool for sustainable
        healthcare and societal development. Hence the name “HELP” which stands
        for Health, Education, Leadership, and Partnership.
      </p>

      {/* Footer Bottom */}
      <div className="border-t-2 mt-12 mb-4 text-white border-white w-full"></div>
      <div className="flex justify-between text-white">
        <p className="text-sm sm:text-md md:text-lg">
          Copyright © 2025 Help Ethiopia
        </p>
        <p className="text-sm sm:text-md md:text-lg">
          Powered by Help Ethiopia
        </p>
      </div>
    </footer>
  );
}
