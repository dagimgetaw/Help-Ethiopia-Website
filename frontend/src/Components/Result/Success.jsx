import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { CircleCheckBig } from "lucide-react";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center pt-40 pb-20 font-text">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md w-full">
        <div className="bg-green-500 p-6 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white shadow-lg">
            <CheckCircleIcon className="h-10 w-10 text-green-500 animate-bounce duration-1000" />
          </div>
        </div>

        <div className="px-8 py-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Donation Received!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your generosity. A receipt will be emailed to you.
          </p>

          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-green-50 rounded-full">
              <CircleCheckBig
                className="w-5 h-5 text-green-500 mr-2"
                size={16}
              />
              <span className="text-green-600 font-medium">
                Donation #12345
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-gray-700">
              <span>Amount</span>
              <span className="font-semibold">$99.00</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Payment Method</span>
              <span className="font-semibold">Visa ending in 4242</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Date</span>
              <span className="font-semibold">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 cursor-pointer"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
