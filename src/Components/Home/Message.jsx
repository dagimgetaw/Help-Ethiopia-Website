import { Link } from "react-router-dom";

export default function Message() {
  return (
    <div className="pt-10 pb-15 xl:pt-30 xl:pb-35 bg-gray-100">
      <h2 className="text-2xl px-8 xl:text-3xl 2xl:text-4xl mt-4 text-center pb-14 font-text font-semibold text-gray-700">
        Register your company as our donor or sponsor and make a lasting impact.
      </h2>
      <div className="flex justify-center">
        <Link to={"/register"}>
          <button className="cursor-pointer py-2 px-12 m-auto border-1 font-text text-xl border-[#1E3A8A] rounded-lg bg-[#1E3A8A] text-white">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
