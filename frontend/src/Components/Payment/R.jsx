import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Spinner from "../Spinner/Spinner";
import StripeCheckout from "./StripeCheckout";
import { Elements } from "@stripe/react-stripe-js";
import {
  Landmark,
  CircleAlert,
  User,
  Mail,
  HandCoins,
  DollarSign,
  Euro,
  PoundSterling,
} from "lucide-react";
import { useFormik } from "formik";
import { donateSchema } from "../../Schemas/schemas";

export default function StripPayment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [currency, setCurrency] = useState("USD");

  const currencySymbols = {
    USD: <DollarSign size={16} />,
    EUR: <Euro size={16} />,
    GBP: <PoundSterling size={16} />,
  };

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        const response = await fetch("http://localhost:3000/config");
        if (!response.ok) throw new Error("Failed to fetch config");
        const { publishableKey } = await response.json();
        setStripePromise(await loadStripe(publishableKey));
      } catch (err) {
        console.error("Error initializing Stripe:", err);
        setError(err.message);
      }
    };
    initializeStripe();
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      amount: "",
    },
    validationSchema: donateSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3000/create-payment-intent",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...values, currency }),
          }
        );

        if (!response.ok) throw new Error("Failed to create payment intent");

        const { clientSecret } = await response.json();
        setClientSecret(clientSecret);
        setShowPaymentForm(true);
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const { values, handleChange, handleBlur, errors, touched, handleSubmit } =
    formik;

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
            {showPaymentForm ? "Complete Payment" : "Make a Donation"}
          </h2>
          <p className="text-center text-gray-600 mb-8">
            {showPaymentForm
              ? "Enter your payment details below"
              : "Support our cause with your generous contribution"}
          </p>

          {errorMessage && (
            <div className="text-red-500 text-center font-text pt-2 mb-4">
              {errorMessage}
            </div>
          )}

          {!showPaymentForm ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <div
                    className={`flex items-center gap-3 shadow-md rounded-lg border border-gray-300 bg-white p-3 
                    ${
                      errors.firstName && touched.firstName
                        ? "ring ring-red-500 ring-offset-0"
                        : "hover:ring hover:ring-blue-500 hover:ring-offset-0"
                    }`}
                  >
                    <User className="text-gray-500" />
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className="w-full outline-none text-gray-700 placeholder-gray-400"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.firstName && touched.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <div
                    className={`flex items-center gap-3 shadow-md rounded-lg border border-gray-300 bg-white p-3 
                    ${
                      errors.lastName && touched.lastName
                        ? "ring ring-red-500 ring-offset-0"
                        : "hover:ring hover:ring-blue-500 hover:ring-offset-0"
                    }`}
                  >
                    <User className="text-gray-500" />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className="w-full outline-none text-gray-700 placeholder-gray-400"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.lastName && touched.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <div
                  className={`flex items-center gap-3 shadow-md rounded-lg border border-gray-300 bg-white p-3
                  ${
                    errors.email && touched.email
                      ? "ring ring-red-500 ring-offset-0"
                      : "hover:ring hover:ring-blue-500 hover:ring-offset-0"
                  }`}
                >
                  <Mail className="text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full outline-none text-gray-700 placeholder-gray-400"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex-1 flex items-center gap-3 shadow-md rounded-lg border border-gray-300 bg-white p-3
                    ${
                      errors.amount && touched.amount
                        ? "ring ring-red-500 ring-offset-0"
                        : "hover:ring hover:ring-blue-500 hover:ring-offset-0"
                    }`}
                  >
                    <HandCoins className="text-gray-500" />

                    <input
                      type="number"
                      name="amount"
                      placeholder="Amount"
                      className="w-full outline-none text-gray-700 placeholder-gray-400 
                                [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:m-0 
                                [&::-webkit-outer-spin-button]:appearance-none 
                                [&::-webkit-inner-spin-button]:m-0 
                                [&::-webkit-inner-spin-button]:appearance-none"
                      value={values.amount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="text-gray-500">
                      {currencySymbols[currency]}
                    </span>
                  </div>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 shadow-md hover:ring hover:ring-blue-500 hover:ring-offset-0"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
                {errors.amount && touched.amount && (
                  <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-md font-medium text-white shadow-sm transition duration-200 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                }`}
              >
                {loading ? "Processing..." : "Continue to Payment"}
              </button>
            </form>
          ) : stripePromise && clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <StripeCheckout
                donationData={{ ...values, currency }}
                onBack={() => setShowPaymentForm(false)}
              />
            </Elements>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
}
