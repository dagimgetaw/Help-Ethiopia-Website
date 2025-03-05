// import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="pt-80 pb-70 2xl:pt-90 text-center bg-gray-50">
      <h2 className="pb-3 text-2xl text-gray-800 font-title">
        1000+ patients Helped
      </h2>
      <p className="pb-22 text-3xl px-3 xl:text-4xl 2xl:text-5xl text-gray-800 font-text font-semibold">
        HELP Ethiopia : Unlocking potential, Building healthcare!
      </p>
      {/* <Link to={"/donate"}>
        <button className="cursor-pointer py-2 px-12 border-1 border-[#1E3A8A] rounded-lg bg-[#1E3A8A] text-white font-text text-lg">
          Donate
        </button>
      </Link> */}
    </div>
  );
}
