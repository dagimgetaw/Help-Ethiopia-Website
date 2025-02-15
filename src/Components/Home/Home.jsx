import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="pt-80 pb-70 2xl:pt-90 text-center bg-gray-100">
      <h2 className="pb-3 text-2xl text-gray-800 font-title">
        1000+ patients Helped
      </h2>
      <p className="pb-22 text-3xl px-3 xl:text-4xl 2xl:text-5xl text-gray-800 font-text font-semibold">
        HELP Ethiopia : Unlocking potential, Building healthcare!
      </p>
      <Link to={"/donate"}>
        <button className="cursor-pointer py-2 px-12 border-1 border-[#F1C40F] rounded-lg bg-[#F1C40F] text-white font-text text-lg">
          Donate
        </button>
      </Link>
    </div>
  );
}
