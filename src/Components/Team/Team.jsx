// import { FaFacebookF, FaLinkedinIn, FaGoogle } from "react-icons/fa";
import teamData from "./People";

export default function Team() {
  return (
    <div className="pt-40 pb-15 pl-10 pr-5 md:px-12 lg:px-20 xl:px-35">
      <h2 className="text-3xl md:text-4x xl:text-5xl 2xl:text-6xl font-bold text-center text-gray-800">
        Meet Our Team!
      </h2>
      <p className="text-center pt-10 text-md md:text-lg leading-8 md:leading-9 font-text mx-auto">
        HELP Ethiopia is run fully by volunteer professionals with different
        backgrounds, sharing a common goal. We are passionate and dedicated to
        making a positive impact in our community.
      </p>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 pb-20">
        {teamData.map((team) => (
          <div
            key={team.name}
            className="bg-white shadow-lg rounded-xl overflow-hidden text-center p-6 transition-transform duration-300 hover:scale-105"
          >
            <img
              src={team.image}
              alt={`Help Ethiopia ${team.name} image`}
              loading="lazy"
              className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-[#1E3A8A]"
            />
            <h3 className="mt-4 text-2xl font-text font-semibold text-gray-800">
              {team.name}
            </h3>
            <p className="text-gray-600 text-sm font-text">{team.position}</p>
            <div className="flex justify-center gap-4 mt-4 text-[#1E3A8A] text-xl">
              <img
                src="https://img.icons8.com/?size=100&id=98972&format=png&color=000000"
                alt="Facebook icon"
                loading="lazy"
                className="w-8 cursor-pointer"
              />
              <img
                src="https://img.icons8.com/?size=100&id=98960&format=png&color=000000"
                alt="Linkedin icon"
                loading="lazy"
                className="w-8 cursor-pointer"
              />
              <img
                src="https://img.icons8.com/?size=100&id=17935&format=png&color=000000"
                alt="Google icon"
                loading="lazy"
                className="w-8 cursor-pointer"
              />
              {/* <FaFacebookF className="hover:text-[#F1C40F] cursor-pointer" /> */}
              {/* <FaLinkedinIn className="hover:text-[#F1C40F] cursor-pointer" /> */}
              {/* <FaGoogle className="hover:text-[#F1C40F] cursor-pointer" /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
