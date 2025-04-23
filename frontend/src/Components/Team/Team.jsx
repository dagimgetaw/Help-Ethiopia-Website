import { Facebook, Linkedin, Mail } from "lucide-react";
import teamData from "./People";

export default function Team() {
  const leadership = teamData.slice(0, 2); // President & VP
  const managers = teamData.slice(2, 6); // Next 4 managers
  const officers = teamData.slice(6); // Remaining team members

  return (
    <div className="py-16 pt-30 px-5 md:px-12 lg:px-20 bg-gray-100 font-text">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            Our Dedicated Team
          </h2>
          {/* <div className="w-20 h-1 mt-3 bg-gray-800 mx-auto mb-6"></div> */}
          <p className="text-lg leading-8 md:leading-9 text-gray-700 mx-auto mt-4">
            HELP Ethiopia is powered by passionate professionals from diverse
            backgrounds, united in our mission to create lasting change in our
            communities.
          </p>
        </div>

        {/* Leadership Tier */}
        <div className="mb-15">
          <h3 className="text-2xl font-bold text-gray-800 mb-10 text-center border-b-2 border-blue-100 pb-2">
            Executive Leadership
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
            {leadership.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
              >
                <div className="p-6 flex flex-col md:flex-row items-center">
                  <div className="relative group">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-3 border-[#1E3A8A] shadow-md transition-all"
                    />
                    <div className="absolute inset-0 rounded-full bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  </div>
                  <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium mt-1">
                      {member.position}
                    </p>
                    <div className="flex justify-center md:justify-start gap-4 mt-4">
                      <a
                        href={member.facebook}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Facebook size={20} />
                      </a>
                      <a
                        href={member.linkedin}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Linkedin size={20} />
                      </a>
                      <a
                        href={`mailto:${member.gmail}`}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Mail size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Management Tier */}
        <div className="mb-15">
          <h3 className="text-2xl font-bold text-gray-800 mb-10 text-center border-b-2 border-blue-100 pb-2">
            Program Management
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {managers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="relative group mx-auto w-32 h-32">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className="w-full h-full rounded-full object-cover border-3 border-[#1E3A8A] shadow-md transition-all"
                    />
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-gray-800">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 text-sm font-medium mt-1">
                      {member.position}
                    </p>
                    <div className="flex justify-center gap-3 mt-4">
                      <a
                        href={member.facebook}
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <Facebook size={18} />
                      </a>
                      <a
                        href={member.linkedin}
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <Linkedin size={18} />
                      </a>
                      <a
                        href={`mailto:${member.gmail}`}
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <Mail size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members Tier */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-10 text-center border-b-2 border-blue-100 pb-2">
            Team Members
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {officers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <div className="p-5 flex items-center">
                  <div className="relative group">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className="w-16 h-16 rounded-full object-cover border-3 border-[#1E3A8A] shadow-sm"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {member.name}
                    </h3>
                    <p className="text-blue-500 text-xs font-medium">
                      {member.position}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <a
                        href={member.facebook}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Facebook size={16} />
                      </a>
                      <a
                        href={member.linkedin}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Linkedin size={16} />
                      </a>
                      <a
                        href={`mailto:${member.gmail}`}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Mail size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
