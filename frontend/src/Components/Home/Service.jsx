import { HandHeart, ShieldCheck, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Service() {
  return (
    <div className="py-12 px-5 md:px-20 xl:px-30 2xl:px-40 gap-12 bg-gray-100 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
        <HandHeart className="m-auto" size={48} strokeWidth={1} />
        <h2 className="text-2xl font-semibold mt-4 font-text">
          Ye'Eteye Charity
        </h2>
        <p className="mt-4 text-md leading-8 font-text">
          Our charitable initiative has helped over 1000 patients who struggled
          to cover their medical bills and were primarily from rural areas of
          our country. We are offering our services at Tikur Anbessa Specialised
          Hospital with recent expansion to Zewditu Memorial Hospital.
        </p>
        {/* <Link>
          <button className="mt-4 py-2 px-6 border border-[#1E3A8A] rounded-lg bg-[#1E3A8A] text-white text-md font-text cursor-pointer">
            Read More
          </button>
        </Link> */}
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
        <ShieldCheck className="m-auto" size={48} strokeWidth={1} />
        <h2 className="text-2xl font-semibold mt-4 font-text">
          Quality Improvement
        </h2>
        <p className="mt-4 text-md leading-8 font-text">
          HELP Ethiopia demonstrates a commitment to continuous improvement by
          implementing impactful programs focusing on streamlining healthcare
          processes, enriching data-driven decision-making, and optimizing
          patient experience.
        </p>
        {/* <Link>
          <button className="mt-4 py-2 px-6 border border-[#1E3A8A] rounded-lg bg-[#1E3A8A] text-white text-md font-text cursor-pointer">
            Read More
          </button>
        </Link> */}
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center md:col-span-2 xl:col-span-1">
        <GraduationCap className="m-auto" size={48} strokeWidth={1} />
        <h2 className="text-2xl font-semibold mt-4 font-text">
          Education & Leadership
        </h2>
        <p className="mt-4 text-md leading-8 font-text">
          HELP Ethiopia recognizes that building a strong healthcare system
          requires not just immediate interventions, but also investment in the
          future. Our program focuses on empowering the next generation of
          Ethiopians to become effective leaders within the healthcare sector.
        </p>
        {/* <Link>
          <button className="mt-4 py-2 px-6 border border-[#1E3A8A] rounded-lg bg-[#1E3A8A] text-white text-md font-text cursor-pointer">
            Read More
          </button>
        </Link> */}
      </div>
    </div>
  );
}
