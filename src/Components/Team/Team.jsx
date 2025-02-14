import { FaFacebookF, FaLinkedinIn, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import teamData from "./People";

export default function Team() {
  return (
    <div className="pt-40 pb-5 pl-10 pr-5 md:px-12 lg:px-20 xl:px-35">
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
              alt={team.name}
              className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-[#1E3A8A]"
            />
            <h3 className="mt-4 text-2xl font-text font-semibold text-gray-800">
              {team.name}
            </h3>
            <p className="text-gray-600 text-sm font-text">{team.position}</p>
            {/* <p className="text-gray-500 text-xs mt-2 font-text">
              {team.Biography}
            </p> */}

            <div className="flex justify-center gap-4 mt-4 text-[#1E3A8A] text-xl">
              <Link to={team.facebook} className="hover:text-[#F1C40F]">
                <FaFacebookF />
              </Link>
              <Link to={team.linkedin} className="hover:text-[#F1C40F]">
                <FaLinkedinIn />
              </Link>
              <Link to={team.gmail} className="hover:text-[#F1C40F]">
                <FaGoogle />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
