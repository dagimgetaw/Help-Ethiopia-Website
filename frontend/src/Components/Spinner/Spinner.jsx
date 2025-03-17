import { HashLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <HashLoader color="#1E3A8A" size={60} />
      <p className="text-lg pt-2 font-semibold text-gray-700 font-text">
        Loading, please wait...
      </p>
    </div>
  );
}
