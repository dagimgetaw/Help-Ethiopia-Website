import { useState } from "react";
import image1 from "../../assets/image1.png";

export default function NewsOne() {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialContent = (
    <>
      <p className="text-base md:text-lg pb-4 font-text leading-7 md:leading-9">
        We are thrilled to share that HELP Ethiopia had the incredible
        opportunity to showcase our work at the Third Annual Conference of the
        Ethiopian Nuclear Science Society, held on June 7 and 8, 2024.
      </p>
      <p className="text-base md:text-lg pb-4 font-text leading-7 md:leading-9">
        During this prestigious event, we were able to present our initiatives
        in the exhibition area, highlighting our efforts to transform healthcare
        and education in Ethiopia. Our participation allowed us to:
      </p>
      <p className="text-lg md:text-xl pb-2 leading-7 md:leading-9">
        <strong>Highlight Key Initiatives:</strong>
      </p>
      <ul className="text-base md:text-lg list-disc list-inside font-text">
        <li className="pb-2 leading-7 md:leading-9">
          Health Service Delivery: Showcasing innovative and evidence-based
          interventions to improve healthcare quality.
        </li>
      </ul>
    </>
  );
  const additionalContent = (
    <>
      <li className="text-md md:text-lg leading-8 md:leading-9 font-text pb-6">
        Ye’Eteye Charity: Sharing our efforts to support economically
        disadvantaged patients, ensuring access to necessary medical treatments.
      </li>
      <li className="text-md md:text-lg leading-8 md:leading-9 font-text pb-6">
        Education and Leadership Programs: Demonstrating our support for health
        science students through essential skills, leadership, and research
        opportunities.
      </li>
      <p className="text-md md:text-lg leading-8 md:leading-9 font-text">
        <strong>Engage with Attendees:</strong> We connected with numerous
        professionals and organizations dedicated to scientific and healthcare
        advancements, expanding our network and building potential
        collaborations.
      </p>
      <p className="text-md md:text-lg leading-8 md:leading-9 pb-4 font-text">
        <strong>Register New Members and Volunteers:</strong> We were delighted
        to welcome new members and volunteers passionate about making a positive
        impact in our community.
      </p>
      <p className="text-md md:text-lg leading-8 md:leading-9 pb-4 font-text">
        HELP Ethiopia remains committed to catalyzing sustainable development by
        empowering healthcare professionals and advocating for quality
        education. We are grateful for the platform provided by the Ethiopian
        Nuclear Science Society to further our mission.
      </p>
      <p className="text-md md:text-lg leading-8 md:leading-9 pb-4 font-text">
        Thank you to everyone who visited our booth and engaged with us.
        Together, we can create a healthier and more educated Ethiopia.
      </p>
    </>
  );
  return (
    <div className="py-12 px-6 md:px-16 lg:px-24 xl:px-32 bg-gray-100">
      <h2 className="text-3xl md:text-3x xl:text-4xl 2xl:text-5xl font-text font-semibold mt-4 text-center text-gray-800">
        News & Events
      </h2>
      <div className="flex flex-col lg:flex-row gap-10 items-center pt-10 lg:pt-14">
        <div className="w-full lg:w-1/2">
          <img
            src={image1}
            alt="News one image"
            loading="lazy"
            className="w-full h-auto max-h-[400px] object-cover rounded-md"
          />
        </div>
        <div className="w-full lg:w-1/2 p-4 rounded-md">
          {initialContent}
          {isExpanded && additionalContent}
          <button
            className="text-[#1E3A8A] font-semibold underline cursor-pointer font-text text-base md:text-lg"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show Less" : "See More"}
          </button>
        </div>
      </div>
    </div>
  );
}
