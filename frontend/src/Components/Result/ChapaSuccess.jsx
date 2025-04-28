import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { CircleCheckBig } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ChapaSuccess() {
  const navigate = useNavigate();

  const [isSaved, setIsSaved] = useState(false);
  const isSaving = useRef(false);

  const getFixedParam = (paramName) => {
    const search = window.location.search;
    const fixedSearch = search.replace(/&amp;/g, "&");
    const fixedParams = new URLSearchParams(fixedSearch);

    const param = fixedParams.get(paramName);
    if (!param) return null;

    try {
      return decodeURIComponent(param);
    } catch {
      // Silent error handling for production
      return param;
    }
  };

  const firstName = getFixedParam("firstName") || "Anonymous";
  const lastName = getFixedParam("lastName") || "Donor";
  const email = getFixedParam("email") || "unknown@gmail.com";
  const phoneNumber = getFixedParam("phoneNumber") || "N/A";
  const amount = getFixedParam("amount") || "0";
  const tx_ref = getFixedParam("tx_ref") || "N/A";
  const paymentDate = getFixedParam("paymentDate") || new Date().toISOString();

  const formatPaymentDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      // Silent error handling for production
      return new Date().toLocaleDateString();
    }
  };

  useEffect(() => {
    const saveTransaction = async () => {
      if (isSaved || isSaving.current) return;

      isSaving.current = true;
      try {
        await axios.post("http://localhost:3000/save-chapa-transaction", {
          firstName,
          lastName,
          email,
          phoneNumber,
          amount,
          tx_ref,
        });
        setIsSaved(true);
      } catch {
        // Silent error handling for production
      } finally {
        isSaving.current = false;
      }
    };

    saveTransaction();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center pt-30 pb-20 font-text">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md w-full">
        <div className="bg-green-500 p-6 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white shadow-lg">
            <CheckCircleIcon className="h-10 w-10 text-green-500 animate-bounce duration-1000" />
          </div>
        </div>

        <div className="px-8 py-10 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Donation Received!
          </h1>
          <p className="text-base text-gray-600 mb-4">
            Thank you for your generosity. A receipt will be emailed to you.
          </p>

          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-green-50 rounded-full">
              <CircleCheckBig
                className="w-5 h-5 text-green-500 mr-2"
                size={16}
              />
              <span className="text-green-600 font-medium">
                Payment ID: {tx_ref}
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-gray-700">
              <span>Donator</span>
              <span className="font-semibold">
                {firstName} {lastName}
              </span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Email</span>
              <span className="font-semibold">{email}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Phone Number</span>
              <span className="font-semibold">{phoneNumber}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Amount</span>
              <span className="font-semibold">{amount} Birr</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Date</span>
              <span className="font-semibold">
                {formatPaymentDate(paymentDate)}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition hover:scale-[1.02] cursor-pointer"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
