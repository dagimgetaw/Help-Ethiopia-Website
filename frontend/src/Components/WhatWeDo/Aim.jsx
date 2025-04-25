export default function Aim() {
  return (
    <section className="pb-16 px-6 md:px-12 lg:px-20 xl:px-36 bg-gray-100 font-text">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
            <div className="p-8 flex-1">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-50 p-4 rounded-full">
                  <img
                    src="https://img.icons8.com/?size=100&id=61256&format=png&color=1E40AF"
                    alt="Quality Improvement"
                    loading="lazy"
                    className="w-16 h-16"
                  />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
                Quality Improvement Programs
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                HELP Ethiopia demonstrates a commitment to continuous
                improvement by implementing three impactful programs focused on
                streamlining healthcare processes, enriching data-driven
                decision-making, and optimizing patient experience.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="flex-shrink-0 mt-1 mr-3 text-blue-600">
                    •
                  </span>
                  <span className="text-gray-700">
                    Operating Room Efficiency Improvement
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 mt-1 mr-3 text-blue-600">
                    •
                  </span>
                  <span className="text-gray-700">
                    Improving Hospital Transfers
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 mt-1 mr-3 text-blue-600">
                    •
                  </span>
                  <span className="text-gray-700">
                    Data Registry Enhancement
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Education Card */}
          <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
            <div className="p-8 flex-1">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-50 p-4 rounded-full">
                  <img
                    src="https://img.icons8.com/?size=100&id=40569&format=png&color=1E40AF"
                    alt="Education icons"
                    loading="lazy"
                    className="w-16 h-16"
                  />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
                Education and Leadership Programs
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                HELP Ethiopia recognizes that building a strong healthcare
                system requires not just immediate interventions, but also
                investment in the future.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our Education and Leadership program focuses on empowering the
                next generation of Ethiopians to become effective leaders and
                agents of positive change within the healthcare sector.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="flex-shrink-0 mt-1 mr-3 text-blue-600">
                    •
                  </span>
                  <span className="text-gray-700">
                    Research Mentorship Program
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 mt-1 mr-3 text-blue-600">
                    •
                  </span>
                  <span className="text-gray-700">
                    Youth Capacity Building for Leadership
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
