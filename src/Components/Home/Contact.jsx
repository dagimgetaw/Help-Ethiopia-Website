import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="py-12 px-30">
      <h2 className="text-5xl font-semibold text-center font-text">
        Contact Us
      </h2>
      <div className="flex justify-center items-center flex-wrap gap-10 pt-14 font-text">
        <div className="flex flex-col justify-between w-full sm:w-3/4 md:w-1/2 xl:w-1/3">
          <form className="shadow-lg shadow-form p-10 flex flex-col gap-1 rounded-md">
            <label className="font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="border w-full mb-4 pl-2 border-[#1E3A8A] p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E3A8A]"
            />
            <label className="font-medium">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="border w-full mb-4 pl-2 border-[#1E3A8A] p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E3A8A]"
            />
            <label className="font-medium">Message</label>
            <textarea
              placeholder="Message"
              rows="4"
              className="border w-full mb-4 pl-2 font-text border-[#1E3A8A] p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E3A8A]"
            ></textarea>
            <div className="flex justify-center">
              <button className="cursor-pointer mt-4 py-2 px-14 border border-[#1E3A8A] rounded-lg bg-[#1E3A8A] text-white">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col gap-10 font-text text-xl">
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-[#1E3A8A] text-3xl mr-4" />
            <p>Addis Ababa, Ethiopia</p>
          </div>
          <div className="flex items-center">
            <FaPhoneAlt className="text-[#1E3A8A] text-3xl mr-4" />
            <p>+251-912-345-678</p>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="text-[#1E3A8A] text-3xl mr-4" />
            <p>contact@helpethiopia.org</p>
          </div>
        </div>
      </div>
    </div>
  );
}
