import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/l.webp";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const isValidEmail = (email) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email address.");
      setMessageType("error");
      return;
    }
    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }
    setMessage("Thank you for subscribing.");
    setMessageType("success");
    setEmail("");
  };
  return (
    <footer className="py-12 px-10 w-full bg-gray-600 font-text">
      <div className="flex flex-col xl:flex-row justify-center">
        <div className="text-center xl:text-left flex-1">
          <img
            src={logo}
            alt="Help Ethiopia Logo"
            loading="lazy"
            className="mx-auto xl:mx-0 w-20 xl:w-30 h-auto"
          />
          <p className="text-white text-sm sm:text-md md:text-lg pt-6">
            We advocate for quality education, nurture leadership, and forge
            collaborations for sustainable healthcare.
          </p>
        </div>
        <div className="flex-1 text-center xl:text-left pt-6">
          <p className="text-white font-text text-center text-lg md:text-xl">
            Subscribe
          </p>
          <p className="text-white text-md sm:text-lg pt-2">
            Sign up with your email address to receive news and updates.
          </p>
          <div className="flex pt-4 justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email address"
              className="border w-md mb-2 pl-2 border-[#1E3A8A] p-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#1E3A8A] bg-white"
            />
            <button
              onClick={handleSubmit}
              className="cursor-pointer mb-2 px-8 border border-[#1E3A8A] rounded-r-md bg-[#1E3A8A] text-white"
            >
              Submit
            </button>
          </div>
          {message && (
            <p
              className={`text-md pt-4 text-center ${
                messageType === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </div>
        <div className="flex flex-1 gap-8 items-center justify-center pt-12">
          <Link
            to="https://www.facebook.com/profile.php?id=100092545625116"
            target="_blank"
            aria-label="Visit our Facebook page"
          >
            <img
              src="https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000"
              alt="Facebook icon"
              loading="lazy"
              className="m-auto w-15"
            />
            {/* <FaFacebook className="m-4 text-5xl cursor-pointer text-[#F1C40F] rounded-xl" /> */}
          </Link>
          <Link
            to="https://twitter.com/YeEteyeCharity?s=35"
            target="_blank"
            aria-label="Visit our Twitter page"
          >
            <img
              src="https://img.icons8.com/?size=100&id=ClbD5JTFM7FA&format=png&color=000000"
              alt="X icon"
              loading="lazy"
              className="m-auto w-15"
            />
            {/* <FaTwitter className="m-4 text-5xl cursor-pointer text-[#F1C40F] rounded-xl" /> */}
          </Link>
          <Link
            to="https://www.instagram.com/p/Cr1NJ15o9pS/?igshid=YmMyMTA2M2Y="
            target="_blank"
            aria-label="Follow us on Instagram"
          >
            <img
              src="https://img.icons8.com/?size=100&id=BrU2BBoRXiWq&format=png&color=000000"
              alt="Instagram icon"
              loading="lazy"
              className="m-auto w-15"
            />
            {/* <FaInstagram className="m-4 text-5xl cursor-pointer text-[#F1C40F] rounded-xl" /> */}
          </Link>
          <Link
            to="https://t.me/help_for_eth"
            target="_blank"
            aria-label="Join our Telegram group"
          >
            <img
              src="https://img.icons8.com/?size=100&id=63306&format=png&color=000000"
              alt="Telegram icon"
              loading="lazy"
              className="m-auto w-15"
            />
            {/* <FaTelegram className="m-4 text-5xl cursor-pointer text-[#F1C40F] rounded-xl" /> */}
          </Link>
        </div>
      </div>
      <p className="pt-12 text-sm sm:text-md md:text-base leading-7 text-white">
        HELP Ethiopia is a multi-disciplinary organization registered and
        accorded legal personality in Ethiopia. We have a dedicated charity
        program targeting economically disadvantaged groups of our society,
        known as Ye’Eteye Charity. Furthermore, we advocate for quality
        education, leadership, and collaboration as a tool for sustainable
        healthcare and societal development. Hence the name “HELP” which stands
        for Health, Education, Leadership, and Partnership.
      </p>
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
