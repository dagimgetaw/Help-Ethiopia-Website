import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Spinner from "../Spinner/Spinner";
import StripeCheckout from "./StripeCheckout";
import { Elements } from "@stripe/react-stripe-js";
import { Landmark, CircleAlert } from "lucide-react";

export default function StripPayment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        const response = await fetch("http://localhost:3000/config");
        if (!response.ok) {
          throw new Error("Failed to fetch config");
        }
        const { publishableKey } = await response.json();
        setStripePromise(await loadStripe(publishableKey));
      } catch (err) {
        console.error("Error initializing Stripe:", err);
        setError(err.message);
      }
    };

    initializeStripe();
  }, []);

  useEffect(() => {
    const createPayment = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/create-payment-intent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to create payment intent");
        }

        const { clientSecret } = await response.json();
        setClientSecret(clientSecret);
      } catch (err) {
        console.error("Error creating payment intent:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    createPayment();
  }, []);

  if (loading) return <Spinner />;
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-text">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <CircleAlert size={16} className="h-12 w-12 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Error
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200 cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-text pt-40">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-6 rounded-full">
              <Landmark className="h-10 w-10 text-blue-600" size={16} />
            </div>
          </div>
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
            Complete Your Payment
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Enter your payment details below
          </p>

          {stripePromise && clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <StripeCheckout />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
}
