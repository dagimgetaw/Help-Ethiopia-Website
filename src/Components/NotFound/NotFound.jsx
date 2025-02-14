import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="pt-80 pb-80 text-center">
      <h2 className="text-9xl font-semibold font-text text-gray-800">404</h2>
      <p className="text-gray-700 font-text text-md leading-7.5">
        Page not found
      </p>
      <div className="donate">
        <Link to={"/"}>
          <button className="cursor-pointer py-2 mt-10 px-10 border-1 border-[#1E3A8A] rounded-lg bg-[#1E3A8A] text-white font-text font-normal text-lg">
            HomePage
          </button>
        </Link>
      </div>
    </div>
  );
}
