import { Facebook, Linkedin, Mails } from "lucide-react";
import teamData from "./People";

export default function Team() {
  return (
    <div className="pt-30 pb-15 pl-10 pr-5 md:px-12 lg:px-20 xl:px-35 bg-gray-100 font-text">
      <h2 className="text-3xl md:text-4xl xl:text-5xl font-semibold mt-4 text-center text-gray-800">
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
              <Facebook
                className="cursor-pointer"
                size={28}
                color="#000000"
                strokeWidth={1}
              />
              <Linkedin
                className="cursor-pointer"
                size={28}
                color="#000000"
                strokeWidth={1}
              />
              <Mails
                className="cursor-pointer"
                size={28}
                color="#000000"
                strokeWidth={1}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
