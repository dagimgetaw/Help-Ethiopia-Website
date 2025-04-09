import { useState, useEffect } from "react";
import {
  Landmark,
  CircleAlert,
  User,
  Mail,
  HandCoins,
  Phone,
  ChevronDown,
  LockKeyhole,
} from "lucide-react";
import { useFormik } from "formik";
import { donateSchema } from "../../Schemas/schemas";

export default function ChapaCheckout() {
  const [chapaPublicKey, setChapaPublicKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countryCode, setCountryCode] = useState("+2519");

  useEffect(() => {
    const fetchChapaConfig = async () => {
      try {
        const response = await fetch("http://localhost:3000/chapa-config");
        if (!response.ok) throw new Error("Failed to fetch Chapa config");
        const { publishableKey } = await response.json();
        setChapaPublicKey(publishableKey);
      } catch (err) {
        console.error("Error initializing Chapa:", err);
        setError(err.message);
      }
    };
    fetchChapaConfig();
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      amount: "",
    },
    validationSchema: donateSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);

      try {
        const fullPhoneNumber = `${countryCode}${values.phoneNumber}`;
        const tx_ref = `${values.firstName}-${values.amount}-${
          Math.floor(Math.random() * 100000) + 1
        }`;

        const returnUrl = new URL(
          `${window.location.origin}/chapa-payment-success`
        );
        returnUrl.searchParams.append(
          "firstName",
          encodeURIComponent(values.firstName)
        );
        returnUrl.searchParams.append(
          "lastName",
          encodeURIComponent(values.lastName)
        );
        returnUrl.searchParams.append(
          "email",
          encodeURIComponent(values.email)
        );
        returnUrl.searchParams.append(
          "amount",
          encodeURIComponent(values.amount)
        );
        returnUrl.searchParams.append(
          "phoneNumber",
          encodeURIComponent(fullPhoneNumber)
        );
        returnUrl.searchParams.append(
          "paymentDate",
          encodeURIComponent(new Date().toISOString())
        );
        returnUrl.searchParams.append("tx_ref", encodeURIComponent(tx_ref));

        const chapaForm = document.createElement("form");
        chapaForm.method = "POST";
        chapaForm.action = "https://api.chapa.co/v1/hosted/pay";

        chapaForm.innerHTML = `
          <input type="hidden" name="public_key" value="${chapaPublicKey}" />
          <input type="hidden" name="tx_ref" value="${tx_ref}" />
          <input type="hidden" name="amount" value="${values.amount}" />
          <input type="hidden" name="currency" value="ETB" />
          <input type="hidden" name="email" value="${values.email}" />
          <input type="hidden" name="first_name" value="${values.firstName}" />
          <input type="hidden" name="last_name" value="${values.lastName}" />
          <input type="hidden" name="phone_number" value="${fullPhoneNumber}" />
          <input type="hidden" name="title" value="Donation" />
          <input type="hidden" name="description" value="Paying with Confidence with Chapa" />
          <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
          <input type="hidden" name="meta[title]" value="Donation" />
          <input type="hidden" name="callback_url" value="https://localhost:3000/verify-payment" />
          <input type="hidden" name="return_url" value="${returnUrl.toString()}" />
        `;

        document.body.appendChild(chapaForm);
        chapaForm.submit();
      } catch (err) {
        console.error("Payment initiation error:", err);
        setError(
          err.response?.data?.error ||
            err.message ||
            "Payment initiation failed"
        );
        setLoading(false);
      }
    },
  });

  const { values, handleChange, handleBlur, errors, touched, handleSubmit } =
    formik;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-text">
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
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 font-text pt-40">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-6 rounded-full">
              <Landmark className="h-10 w-10 text-blue-600" />
            </div>
          </div>
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
            Make a Donation
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Enter your payment details below
          </p>
          <form onSubmit={handleSubmit} className="space-y-6 pt-5">
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
                  <User className="text-gray-500 w-5 h-5" />
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
                  <User className="text-gray-500 w-5 h-5" />
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
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
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
                <Mail className="text-gray-500 w-5 h-5" />
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

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <div
                  className={`flex items-center gap-2 shadow-md rounded-lg border border-gray-300 bg-white p-3 
                    ${
                      errors.phoneNumber && touched.phoneNumber
                        ? "ring ring-red-500 ring-offset-0"
                        : "hover:ring hover:ring-blue-500 hover:ring-offset-0"
                    }`}
                >
                  <Phone className="text-gray-500 w-5 h-5 flex-shrink-0" />
                  <div className="relative flex items-center w-32">
                    <select
                      className="appearance-none bg-transparent pl-2 pr-5 text-gray-700 focus:outline-none cursor-pointer w-full"
                      aria-label="Country code"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                    >
                      <option value="+2519">+2519</option>
                      <option value="+2517">+2517</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="text-gray-500 absolute right-0 pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="tel" // Changed to tel for better mobile input
                    name="phoneNumber"
                    placeholder="12345678"
                    className="w-full outline-none text-gray-700 placeholder-gray-400"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength="8"
                  />
                </div>
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <div
                  className={`flex items-center gap-3 shadow-md rounded-lg border border-gray-300 bg-white p-3 
                    ${
                      errors.amount && touched.amount
                        ? "ring ring-red-500 ring-offset-0"
                        : "hover:ring hover:ring-blue-500 hover:ring-offset-0"
                    }`}
                >
                  <HandCoins className="text-gray-500 w-5 h-5" />
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
                    min="10"
                  />
                  <p className="ml-auto text-sm text-gray-700">Birr</p>
                </div>
                {errors.amount && touched.amount && (
                  <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !chapaPublicKey}
              className={`w-full py-3 mt-3 rounded-lg text-white font-medium ${
                loading || !chapaPublicKey
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#1E3A8A] hover:bg-[#172554] transition-colors cursor-pointer"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Pay Now"
              )}
            </button>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <LockKeyhole size={16} />
              <span>Payments are secure and encrypted</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
