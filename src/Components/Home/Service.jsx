import { FaHandHoldingHeart, FaAward, FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Service() {
  return (
    <div className="py-12 px-10 md:px-20 xl:px-30 2xl:px-40 gap-12 bg-gray-100 flex flex-col md:grid md:grid-cols-2 md:gap-8 xl:grid-cols-3 xl:gap-8 xl:justify-center xl:items-center">
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center flex-1">
        <FaHandHoldingHeart className="m-auto text-6xl text-gray-700" />
        <h2 className="text-2xl font-semibold mt-4 font-text">
          Ye'Eteye Charity
        </h2>
        <p className="mt-4 font-text text-md leading-8">
          Our charitable initiative has helped over 1000 patients who struggled
          to cover their medical bills and were primarily from rural areas of
          our country. We are offering our services at Tikur Anbessa Specialised
          Hospital with recent expansion to Zewditu Memorial Hospital.
        </p>
        <Link>
          <button className="mt-4 py-2 px-6 border border-[#F1C40F] rounded-lg bg-[#F1C40F] text-white font-text font-normal text-md hover:bg-yellow-500 transition cursor-pointer">
            Read More
          </button>
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 text-center flex-1">
        <FaAward className="m-auto text-6xl text-gray-700" />
        <h2 className="text-2xl font-semibold mt-4 font-text">
          Quality Improvement
        </h2>
        <p className="mt-4 font-text text-md leading-8">
          HELP Ethiopia demonstrates a commitment to continuous improvement by
          implementing impactful programs focusing on streamlining healthcare
          processes, enriching data-driven decision-making, and optimizing
          patient experience.
        </p>
        <Link>
          <button className="mt-4 py-2 px-6 border border-[#F1C40F] rounded-lg bg-[#F1C40F] text-white font-text font-normal text-md hover:bg-yellow-500 transition cursor-pointer">
            Read More
          </button>
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 text-center flex-1 md:col-span-2 xl:col-span-1">
        <FaUserTie className="m-auto text-6xl text-gray-700" />
        <h2 className="text-2xl font-semibold mt-4 font-text">
          Education & Leadership
        </h2>
        <p className="mt-4 font-text text-md leading-8">
          HELP Ethiopia recognizes that building a strong healthcare system
          requires not just immediate interventions, but also investment in the
          future. Our program focuses on empowering the next generation of
          Ethiopians to become effective leaders within the healthcare sector.
        </p>
        <Link>
          <button className="mt-4 py-2 px-6 border border-[#F1C40F] rounded-lg bg-[#F1C40F] text-white font-text font-normal text-md hover:bg-yellow-500 transition cursor-pointer">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
}
