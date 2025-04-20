import { useState } from "react";
import img from "../../assets/eteye.webp";

export default function History() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="pb-16 px-6 md:px-12 lg:px-24 xl:px-32 bg-gray-100 font-text">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How We Started
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 space-y-6">
            <div className="space-y-4">
              <p className="text-lg leading-8 md:leading-9 text-gray-700">
                HELP Ethiopia is established by a group of medical doctors and
                other professionals based in Ethiopia and members of the
                Ethiopian diaspora.
              </p>
              <p className="text-lg leading-8 md:leading-9 text-gray-700">
                HELP Ethiopia originated from a desire to address persistent
                challenges in healthcare. Our charity arm, Eteye Health Charity,
                was founded by a fund granted in memory of Woizero Yewoinshet
                Seifu by her family members who used to call her &quot;
                <strong className="text-blue-600">Eteye</strong>.&quot; As
                &quot;Eteye&quot; is a nickname used by many Ethiopians to
                display affection, it is endorsed by HELP ETHIOPIA to serve as
                the official name for its charity branch.
              </p>
              <p className="text-lg leading-8 md:leading-9 text-gray-700">
                The charity service was maintained with the generous support of
                Ethiopians in North America and local partners. Though it is
                satisfying to see helpless patients being supported through our
                charity, the lack of sustainable solutions to poor health
                service delivery and training remains a significant challenge.
              </p>
            </div>

            {isExpanded && (
              <p className="text-lg leading-8 md:leading-9 text-gray-700">
                Recognizing the need for sustainable solutions, we leverage our
                diverse expertise and partnerships to innovate and enact lasting
                change. HELP Ethiopia is run by a team of professionals who are
                passionate and dedicated to making a positive impact in our
                community.
              </p>
            )}

            <button
              className="text-blue-700 font-semibold hover:text-blue-800 text-lg mt-4 flex items-center gap-2 cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  <span>Show Less</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <span>See More</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <img
                src={img}
                alt="Eteye's Image"
                loading="lazy"
                className="w-full max-w-sm md:max-w-md lg:max-w-xl h-auto"
              />
              <div className="absolute -inset-2 border-2 border-blue-400 rounded-lg opacity-20 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
