// import { FaUsers, FaUserGraduate } from "react-icons/fa";

export default function Aim() {
  return (
    <div className="py-12 px-6 md:px-12 lg:px-20 xl:px-36 bg-gray-100">
      <div className="flex flex-col md:flex-row gap-10 items-stretch pb-15">
        <div className="bg-white shadow-lg rounded-2xl p-6 flex-1 flex flex-col">
          {/* <FaUsers className="m-auto text-5xl md:text-6xl text-gray-700" /> */}
          <img
            src="https://img.icons8.com/?size=100&id=61256&format=png&color=000000"
            alt="Stock Increase icons"
            loading="lazy"
            className="m-auto w-15"
          />
          <h2 className="text-2xl font-semibold mt-4 font-text text-center">
            Quality Improvement Programs
          </h2>
          <p className="mt-4 font-text text-md md:text-lg leading-8 md:leading-9 flex-grow">
            HELP Ethiopia demonstrates a commitment to continuous improvement by
            implementing three impactful programs focused on streamlining
            healthcare processes, enriching data-driven decision-making, and
            optimizing patient experience.
          </p>
          <ul className="text-md md:text-lg leading-8 md:leading-9 list-disc list-inside font-text pl-6 pt-4">
            <li className="pb-2 leading-7 md:leading-9">
              Operating Room Efficiency Improvement
            </li>
            <li className="pb-2 leading-7 md:leading-9">
              Improving Hospital Transfers
            </li>
            <li className="pb-2 leading-7 md:leading-9">
              Data Registry Enhancement
            </li>
          </ul>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 flex-1 flex flex-col">
          {/* <FaUserGraduate className="m-auto text-5xl md:text-6xl text-gray-700" /> */}
          <img
            src="https://img.icons8.com/?size=100&id=40569&format=png&color=000000"
            alt="Education icons"
            loading="lazy"
            className="m-auto w-15"
          />
          <h2 className="text-2xl font-semibold mt-4 font-text text-center">
            Education and Leadership Programs
          </h2>
          <p className="mt-4 font-text text-md md:text-lg leading-8 md:leading-9 flex-grow">
            HELP Ethiopia recognizes that building a strong healthcare system
            requires not just immediate interventions, but also investment in
            the future.
          </p>
          <p className="mt-2 font-text text-base md:text-lg leading-7 md:leading-9">
            Our Education and Leadership program focuses on empowering the next
            generation of Ethiopians to become effective leaders and agents of
            positive change within the healthcare sector.
          </p>
          <ul className="text-base md:text-lg list-disc list-inside font-text pl-6 pt-4">
            <li className="pb-2 leading-7 md:leading-9">
              Research Mentorship Program
            </li>
            <li className="pb-2 leading-7 md:leading-9">
              Youth Capacity Building for Leadership
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
