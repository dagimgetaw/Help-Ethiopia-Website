import { useState } from "react";
import image2 from "../../assets/image2.jpg";

export default function NewsOne() {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialContent = (
    <>
      <p className="text-lg md:text-xl leading-8 md:leading-9 font-text pb-4">
        <strong>Sport to Support Event!</strong>
      </p>
      <p className="text-md md:text-lg pb-4 leading-8 md:leading-9 font-text">
        We had an amazing time on Feb 4 at the HELP Ethiopia sports event at St.
        Joseph school ground! We got our sweat on with Fit Corner Sport Training
        & Consultancy P.L.C leading a group aerobic exercise and a competitive
        soccer match between preclinical 2 and clinical 1 students. But it
        wasn’t just about scoring goals—they were scoring points for a great
        cause! This event raised funds for HELP Ethiopia’s Ye’Etye charity,
        which has already helped over 1,000 patients struggling with medical
        bills, primarily from rural areas. This charity initiative primarily
        operates at Tikur Anbessa Hospital, providing crucial medical support to
        those in need.
      </p>
    </>
  );
  const additionalContent = (
    <>
      <p className="text-md md:text-lg pb-4 leading-8 md:leading-9 font-text">
        A big thank you to everyone who participated, donated, and made this
        event such a success! This is just the start—we’re planning more events
        like this in the future for fundraising and advocacy. Stay tuned and
        join us in the future! HELP Ethiopia is a multi-disciplinary nonprofit
        organization registered and accorded legal personality in Ethiopia.
      </p>
      <p className="text-md md:text-lg pb-4 leading-8 md:leading-9 font-text">
        We have a dedicated charity program targeting economically disadvantaged
        groups of our society, known as Ye’Eteye Charity. Furthermore, we
        advocate for quality education and leadership as a tool for sustainable
        healthcare and societal development. Hence the name “HELP,” which stands
        for Health, Education, Leadership, and Partnership.
      </p>
    </>
  );
  return (
    <div className="py-10 px-6 md:px-16 lg:px-24 bg-gray-100">
      <div className="flex flex-col-reverse lg:flex-row gap-10 items-center">
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
        <div className="w-full lg:w-1/2">
          <img
            src={image2}
            alt="News two image"
            loading="lazy"
            className="w-full h-auto max-h-[400px] object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
