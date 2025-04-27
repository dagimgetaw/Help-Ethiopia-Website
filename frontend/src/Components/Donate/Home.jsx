import member from "../../assets/member.webp";

export default function DonationSection() {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 xl:px-36 bg-gray-100 font-text">
      <div className="max-w-7xl mx-auto">
        <div className="text-center pb-12 relative">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 pt-15">
            Make a Life-Changing Donation
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative group overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <img
                src={member}
                alt="Members of Help Ethiopia making a difference"
                loading="lazy"
                className="w-full max-w-lg h-auto object-cover transform transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <span className="text-white font-medium text-lg">Members</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <p className="text-gray-700 mb-6 leading-relaxed">
                HELP Ethiopia is run by dedicated volunteers and supported by
                generous donors like you. Your contribution directly funds:
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-4 bg-blue-100 rounded-full p-2">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Life-saving medical treatments
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-4 bg-blue-100 rounded-full p-2">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Essential laboratory tests
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-4 bg-blue-100 rounded-full p-2">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Diagnostic imaging services
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-4 bg-blue-100 rounded-full p-2">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Critical surgical supplies
                  </span>
                </li>
              </ul>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                <p className="text-lg font-semibold text-blue-700 text-center">
                  Every donation, no matter the size, creates a lasting impact!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
