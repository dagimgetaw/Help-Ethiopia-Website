import { useState } from "react";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const isValidEmail = (email) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(isValidEmail(e.target.value) ? "" : "Invalid email address");
  };

  const openGoogleMaps = () => {
    const url =
      "https://www.google.com/maps/search/?api=1&query=Tikur+Ambessa+Teaching+Hospital,Addis+Ababa";
    window.open(url, "_blank");
  };

  return (
    <div className="pb-18 px-10 md:px-20 xl:px-32 2xl:px-40 bg-gray-100 flex flex-col md:flex-row justify-center gap-12">
      <div className="md:text-left flex-1 w-full md:w-1/2">
        <h2 className="text-3xl font-text font-semibold text-gray-800 pb-10">
          <span className="border-b-3 border-gray-800">Get In Touch</span>
        </h2>
        <div className="space-y-6 text-gray-800 font-text">
          <div className="flex items-center">
            <img
              src="https://img.icons8.com/?size=100&id=85353&format=png&color=000000"
              alt="Location icon"
              loading="lazy"
              className="w-8 flex-shrink-0"
            />
            <p className="text-lg ml-3">
              Tikur Ambessa Teaching Hospital, Zambia Street, Addis Ababa,
              Ethiopia{" "}
              <span
                className="text-[#1E3A8A] font-semibold cursor-pointer font-text"
                onClick={openGoogleMaps}
              >
                Open In Maps
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <img
              src="https://img.icons8.com/?size=100&id=9730&format=png&color=000000"
              alt="Phone icon"
              loading="lazy"
              className="w-8 flex-shrink-0"
            />
            <p className="text-lg ml-3">+251-912-345-678</p>
          </div>
          <div className="flex items-center">
            <img
              src="https://img.icons8.com/?size=100&id=63489&format=png&color=000000"
              alt="Envelope icon"
              loading="lazy"
              className="w-8 flex-shrink-0"
            />
            <p className="text-lg ml-3">contact@helpethiopia.org</p>
          </div>
        </div>
      </div>
      <div className="hidden md:block border-l-2 border-gray-300 h-64"></div>
      <div className="flex-1 w-full md:w-1/2 space-y-4">
        <div className="relative">
          <img
            src="https://img.icons8.com/?size=100&id=83190&format=png&color=000000"
            alt="User icon"
            loading="lazy"
            className="w-6 flex-shrink-0 absolute top-3 left-3"
          />
          <input
            type="text"
            placeholder="Name"
            className="w-full pl-12 p-3 rounded-md border border-gray-300 bg-white focus:outline-none"
          />
        </div>
        <div className="relative">
          <img
            src="https://img.icons8.com/?size=100&id=85500&format=png&color=000000"
            alt="Email icon"
            loading="lazy"
            className="w-6 flex-shrink-0 absolute top-3 left-3"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="w-full pl-12 p-3 rounded-md border border-gray-300 bg-white focus:outline-none"
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>
        <div className="relative">
          <img
            src="https://img.icons8.com/?size=100&id=85962&format=png&color=000000"
            alt="Pencil icon"
            loading="lazy"
            className="w-6 flex-shrink-0 absolute top-3 left-3"
          />
          <textarea
            placeholder="Message"
            rows="5"
            className="w-full pl-12 p-3 rounded-md border border-gray-300 bg-white focus:outline-none"
          ></textarea>
        </div>
        <button className="w-30 justify-center font-text flex m-auto bg-[#1E3A8A] text-white py-3 rounded-md">
          Send
        </button>
      </div>
    </div>
  );
}
