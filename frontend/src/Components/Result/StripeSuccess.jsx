import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { CircleCheckBig } from "lucide-react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function StripeSuccess() {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const isSaving = useRef(false);

  const queryString = window.location.search.substring(1);
  const paramPairs = queryString.split("&");
  const params = {};

  paramPairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    if (key && value) {
      params[key] = decodeURIComponent(value);
    }
  });

  const firstName = params.firstName || "Anonymous";
  const lastName = params.lastName || "Donor";
  const email = params.email || "unknown@gmail.com";
  const country = params.country || "Unknown";
  const amount = params.amount || "0";
  const currency = params.currency || "USD";
  const paymentDate = params.paymentDate || new Date().toISOString();

  const transactionId = `STRIPE-${amount}-${
    Math.floor(Math.random() * 100000) + 1
  }`;

  useEffect(() => {
    const saveTransaction = async () => {
      if (isSaved || isSaving.current) return;

      isSaving.current = true;
      try {
        await axios.post("http://localhost:3000/save-stripe-transaction", {
          firstName,
          lastName,
          email,
          country,
          amount,
          currency: currency.toUpperCase(),
          transactionId,
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

  function formatPaymentDate(dateString) {
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
      return new Date().toLocaleDateString();
    }
  }

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
                Payment ID: {transactionId}
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
              <span>Country</span>
              <span className="font-semibold">{country}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Amount</span>
              <span className="font-semibold">
                {amount} {currency}
              </span>
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
