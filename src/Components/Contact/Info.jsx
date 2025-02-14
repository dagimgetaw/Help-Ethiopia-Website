import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Info() {
  return (
    <div className="pt-40 pb-16 bg-gray-100 pl-10 pr-5 md:px-16 lg:px-24 xl:px-32 2xl:px-40">
      {/* Heading */}
      <h2 className="pb-6 text-2xl md:text-3xl text-center font-text font-semibold text-gray-800">
        Give us a call, email us, or visit us at our address below!
      </h2>
      <div className="border-t-2 border-gray-600 w-32 mx-auto"></div>

      {/* Contact Details */}

      <div className="py-8 flex flex-col font-text space-y-6 md:space-y-8 items-center">
        {/* Address */}
        <div className="flex items-center space-x-6 md:space-x-8 w-full max-w-lg">
          <FaMapMarkerAlt className="text-gray-700 text-3xl md:text-4xl flex-shrink-0" />
          <p className="text-base md:text-lg leading-6 md:leading-8 text-center md:text-left">
            Tikur Ambessa Teaching Hospital, Zambia Street, Addis Ababa,
            Ethiopia
          </p>
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-6 md:space-x-8 w-full max-w-lg">
          <FaPhoneAlt className="text-gray-700 text-3xl md:text-4xl flex-shrink-0" />
          <p className="text-base md:text-lg leading-6 md:leading-8 text-center md:text-left">
            +251-939-808-182
          </p>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-6 md:space-x-8 w-full max-w-lg">
          <FaEnvelope className="text-gray-700 text-3xl md:text-4xl flex-shrink-0" />
          <p className="text-base md:text-lg leading-6 md:leading-8 text-center md:text-left">
            helpforethiopia@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}
