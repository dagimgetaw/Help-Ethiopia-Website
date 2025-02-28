// import { useState } from "react";
import { MapPin, Phone, Mail, User, Pencil } from "lucide-react";

export default function Contact() {
  // const [email, setEmail] = useState("");
  // const [emailError, setEmailError] = useState("");

  // const isValidEmail = (email) => {
  //   const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  //   return regex.test(email);
  // };

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  //   setEmailError(isValidEmail(e.target.value) ? "" : "Invalid email address");
  // };

  const openGoogleMaps = () => {
    const url =
      "https://www.google.com/maps/search/?api=1&query=Tikur+Ambessa+Teaching+Hospital,Addis+Ababa";
    window.open(url, "_blank");
  };

  return (
    <div className="pb-18 px-10 md:px-20 xl:px-32 2xl:px-40 bg-gray-100 flex flex-col md:flex-row justify-center gap-12 font-text">
      <div className="md:text-left flex-1 w-full md:w-1/2">
        <h2 className="text-3xl font-semibold text-gray-800 pb-10">
          <span className="border-b-3 border-gray-800">Get In Touch</span>
        </h2>
        <div className="space-y-6 text-gray-800">
          <div className="flex items-center">
            <MapPin size={32} />
            <p className="text-lg ml-3">
              Tikur Ambessa Teaching Hospital, Zambia Street, Addis Ababa,
              Ethiopia{" "}
              <span
                className="text-[#1E3A8A] font-semibold cursor-pointer border-b-2"
                onClick={openGoogleMaps}
              >
                Open In Maps
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <Phone size={32} />
            <p className="text-lg ml-3">+251-912-345-678</p>
          </div>
          <div className="flex items-center">
            <Mail size={32} />
            <p className="text-lg ml-3">contact@helpethiopia.org</p>
          </div>
        </div>
      </div>
      <div className="hidden md:block border-l-2 border-gray-300 h-64"></div>
      <div className="flex-1 w-full md:w-1/2 space-y-4">
        <div className="flex gap-3 shadow-md rounded-lg border border-gray-300 bg-white p-3">
          <User className="text-gray-500 " />
          <input
            type="text"
            name="firstName"
            placeholder="Name"
            className="w-full rounded-md focus:outline-none"
          />
        </div>
        <div>
          <div className="flex gap-3 shadow-md rounded-lg border border-gray-300 bg-white p-3">
            <Mail className="text-gray-500 " />
            <input
              type="email"
              name="email"
              // value={email}
              // onChange={handleEmailChange}
              placeholder="Email"
              className="w-full rounded-md focus:outline-none"
            />
          </div>
          {/* {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )} */}
        </div>
        <div className="flex gap-3 shadow-md rounded-lg border border-gray-300 bg-white p-3">
          <Pencil className="text-gray-500 " />
          <textarea
            placeholder="Type your message..."
            rows="5"
            aria-label="Message"
            className="w-full rounded-md focus:outline-none"
          ></textarea>
        </div>
        <button className="w-30 justify-center flex m-auto bg-[#1E3A8A] text-white py-3 rounded-md cursor-pointer">
          Send
        </button>
      </div>
    </div>
  );
}
