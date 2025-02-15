import { useState } from "react";
import img from "../../assets/eteye.jpg";

export default function History() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="py-10 px-6 md:px-12 lg:px-20 xl:px-32 bg-gray-100">
      <h2 className="text-3xl md:text-4xl xl:text-5xl font-semibold text-center text-gray-800">
        How We Started
      </h2>
      <div className="flex flex-col-reverse lg:flex-row items-center gap-8 pt-12">
        <div className="lg:w-1/2 space-y-4">
          <p className="text-md md:text-lg leading-8 md:leading-9 font-text">
            HELP Ethiopia is established by a group of medical doctors and other
            professionals based in Ethiopia and members of the Ethiopian
            diaspora.
          </p>
          <p className="text-md md:text-lg leading-8 md:leading-9 font-text">
            HELP Ethiopia originated from a desire to address persistent
            challenges in healthcare. Our charity arm, Eteye Health Charity, was
            founded by a fund granted in memory of Woizero Yewoinshet Seifu by
            her family members who used to call her “<strong>Eteye</strong>.” As
            “Eteye” is a nickname used by many Ethiopians to display affection,
            it is endorsed by HELP ETHIOPIA to serve as the official name for
            its charity branch.
          </p>
          <p className="text-md md:text-lg leading-8 md:leading-9 font-text">
            The charity service was maintained with the generous support of
            Ethiopians in North America and local partners. Though it is
            satisfying to see helpless patients being supported through our
            charity, the lack of sustainable solutions to poor health service
            delivery and training remains a significant challenge.
          </p>
          {isExpanded && (
            <p className="text-md md:text-lg leading-8 md:leading-9 font-text">
              Recognizing the need for sustainable solutions, we leverage our
              diverse expertise and partnerships to innovate and enact lasting
              change. HELP Ethiopia is run by a team of professionals who are
              passionate and dedicated to making a positive impact in our
              community.
            </p>
          )}
          <button
            className="text-[#1E3A8A] font-semibold font-text underline cursor-pointer text-base md:text-lg mt-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show Less" : "See More"}
          </button>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <img
            src={img}
            alt="Eteye's Image"
            loading="lazy"
            className="w-full max-w-sm md:max-w-md lg:max-w-xl h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
