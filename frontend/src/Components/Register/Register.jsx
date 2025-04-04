import {
  Mail,
  User,
  VenusAndMars,
  Calendar1,
  BriefcaseBusiness,
  Building2,
  Check,
} from "lucide-react";

export default function Register() {
  const openGoogleForm = () => {
    const url =
      "https://docs.google.com/forms/d/e/1FAIpQLSdrs5g5p9E9yG_6PbK9dr-nF1NaoFrMI96VY6U4HHOcwE2obQ/viewform";
    window.open(url, "_blank");
  };

  return (
    <div className="pt-30 flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 bg-gray-100 font-text py-10 text-md">
      <div className="w-ful p-8 md:p-12">
        <div className="text-center">
          <h2 className="text-xl font-title text-gray-900">Help Ethiopia</h2>
          <h6 className="mt-2 text-xl md:text-3xl font-semibold text-gray-700 pb-1">
            <span className="border-b-4 border-gray-900">
              Volunteer & Membership Registration
            </span>
          </h6>
          <p className="mt-4 text-gray-600 leading-relaxed">
            HELP Ethiopia is a CSO established in October 2020, with a vision of
            a prosperous African nation whose citizens have a disciplined work
            ethic, are knowledgeable and skilled.
          </p>
        </div>

        <div className="flex items-center my-8 w-full">
          <div className="border-t border-gray-300 flex-grow"></div>
          <p className="mx-4 text-gray-500 text-lg font-medium">
            Registration Form
          </p>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="flex items-center gap-3 border border-gray-300 bg-white p-3 rounded-lg shadow-sm hover:ring-2 hover:ring-blue-500 transition-all">
            <User className="text-gray-500" />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-full outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Last Name */}
          <div className="flex items-center gap-3 border border-gray-300 bg-white p-3 rounded-lg shadow-sm hover:ring-2 hover:ring-blue-500 transition-all">
            <User className="text-gray-500" />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Sex */}
          <div className="flex items-center gap-3 border border-gray-300 bg-white p-3 rounded-lg shadow-sm hover:ring-2 hover:ring-blue-500 transition-all cursor-pointer">
            <VenusAndMars className="text-gray-500" />
            <select className="w-full outline-none bg-transparent cursor-pointer">
              <option value="select" className="text-gray-400">
                Select
              </option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>

          {/* Birth Year */}
          <div className="flex items-center gap-3 border border-gray-300 bg-white p-3 rounded-lg shadow-sm hover:ring-2 hover:ring-blue-500 transition-all">
            <Calendar1 className="text-gray-500" />
            <input
              type="number"
              name="year"
              placeholder="Birth Year (GC)"
              className="w-full outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 border border-gray-300 bg-white p-3 rounded-lg shadow-sm hover:ring-2 hover:ring-blue-500 transition-all">
            <Mail className="text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Occupation */}
          <div className="flex items-center gap-3 border border-gray-300 bg-white p-3 rounded-lg shadow-sm hover:ring-2 hover:ring-blue-500 transition-all cursor-pointer">
            <BriefcaseBusiness className="text-gray-500" />
            <select className="w-full outline-none bg-transparent cursor-pointer">
              <option value="select">Select</option>
              <option value="student">Student</option>
              <option value="unemployed">Unemployed</option>
              <option value="employed">Employed</option>
            </select>
          </div>
        </div>

        <h3 className="mt-10 text-lg font-semibold text-gray-800">
          Current Work Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {["Field of Work", "Organization"].map((placeholder, index) => (
            <div
              key={index}
              className="flex items-center gap-3 border border-gray-300 bg-white p-3 rounded-lg shadow-sm hover:ring-2 hover:ring-blue-500 transition-all"
            >
              {index === 0 ? (
                <BriefcaseBusiness className="text-gray-500" />
              ) : (
                <Building2 className="text-gray-500" />
              )}
              <input
                type="text"
                placeholder={placeholder}
                className="w-full outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          ))}
        </div>

        <h3 className="mt-10 text-lg font-semibold text-gray-800">Interest</h3>
        <p className="pt-2 text-gray-600">
          Where would you like to be involved?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {[
            "Charity",
            "Fund Raising Events",
            "Public Relations",
            "IT",
            "Health Quality Improvement",
            "Education",
            "Research",
            "Finance",
            "Consultation",
          ].map((interest, index) => (
            <label
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
            >
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-[#1E3A8A]  rounded border-gray-300 focus:ring-[#1E3A8A]"
              />
              <span className="text-gray-700">{interest}</span>
            </label>
          ))}
        </div>

        <h3 className="mt-10 text-lg font-semibold text-gray-800">
          Rights & Responsibilities
        </h3>
        {[
          {
            title: "Rights",
            items: [
              "All regular members have equal rights.",
              "Membership is an individual right that cannot be passed on.",
              "Right to vote and be voted for.",
              "Right to inquire and obtain information on activities.",
              "Right to opine on HELP Ethiopia's activities.",
              "Right to be informed upon termination.",
              "Right to contribute to HELP Ethiopia's objectives.",
            ],
          },
          {
            title: "Responsibilities",
            items: [
              "All regular members should pay fees timely.",
              "Associate members may voluntarily pay fees.",
              "All members shall abide by the bylaws.",
              "All members shall respect HELP Ethiopia’s vision.",
              "All members should attend meetings.",
            ],
          },
        ].map((section, index) => (
          <div key={index} className="mt-6">
            <p className="font-semibold text-gray-800">{section.title}:</p>
            <ul className="mt-2 space-y-2">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <Check className="text-[#1E3A8A]  flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <p className="pt-6">
          I have read and agree to the rights and responsibilities of members.
        </p>
        <div className="flex items-center gap-4 mt-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="agreement"
              className="form-radio h-5 w-5 text-[#1E3A8A]"
            />{" "}
            <span className="text-gray-700">Yes</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="agreement"
              className="form-radio h-5 w-5 text-[#1E3A8A]"
            />{" "}
            <span className="text-gray-700">No</span>
          </label>
        </div>

        <h3 className="mt-10 text-lg font-semibold text-gray-800">
          Registration Type
        </h3>
        <div className="flex items-center gap-4 mt-4">
          {["Regular member", "Associate member"].map((type, index) => (
            <label key={index} className="flex items-center gap-2">
              <input
                type="radio"
                name="registration"
                className="form-radio h-5 w-5 text-[#1E3A8A] "
              />{" "}
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>

        <p
          className="pt-6 text-[#1E3A8A] font-semibold cursor-pointer"
          onClick={openGoogleForm}
        >
          <span className="border-b-2">Register using google form</span>
        </p>

        <div className="mt-8 text-center">
          <button className="px-6 py-3 text-white bg-[#1E3A8A] rounded-lg text-lg font-medium hover:bg-blue-700 transition-all">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
