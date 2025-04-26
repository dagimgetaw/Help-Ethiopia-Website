import { useState, useEffect, useRef } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  User,
  Mail,
  MapPin,
  HandCoins,
  ChevronDown,
  Search,
  Landmark,
  CircleAlert,
  BadgeInfo,
  Loader2,
  LockKeyhole,
} from "lucide-react";
import allCountries from "./AllCountry";
import { useFormik } from "formik";
import { donateSchema } from "../../Schemas/schemas";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { HashLoader } from "react-spinners";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const scaleUp = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

function PaymentForm({ clientSecret, onFormValuesChange }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const countryDropdownRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "United States",
      amount: "",
      currency: "USD",
    },
    validationSchema: donateSchema,
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    isValid,
    dirty,
  } = formik;

  const handleSuccess = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${
          window.location.origin
        }/stripe-payment-success?firstName=${encodeURIComponent(
          values.firstName
        )}&lastName=${encodeURIComponent(
          values.lastName
        )}&email=${encodeURIComponent(
          values.email
        )}&country=${encodeURIComponent(
          values.country
        )}&amount=${encodeURIComponent(
          values.amount
        )}&currency=${encodeURIComponent(
          values.currency
        )}&paymentDate=${encodeURIComponent(new Date().toISOString())}`,
      },
    });

    if (error) {
      setMessage(error.message);
    }
    setIsProcessing(false);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    await handleSubmit();
    handleSuccess(e);

    // Check if form is valid before proceeding with payment
    if (!(isValid && dirty)) {
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        document.querySelector(`[name="${firstError}"]`)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter countries based on search term
  const filteredCountries = allCountries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.form
      onSubmit={onFormSubmit}
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* First Name & Last Name */}
      <div className="grid grid-col-1 md:grid-cols-2 gap-4">
        <motion.div
          className="flex flex-col"
          variants={scaleUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <motion.div
            className={`flex items-center gap-3 shadow-sm rounded-lg border bg-white p-3 transition-all duration-200 ${
              errors.firstName && touched.firstName
                ? "border-red-500 ring-1 ring-red-500"
                : "border-gray-300 hover:border-blue-500 hover:ring-1 hover:ring-blue-500"
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <User className="text-gray-500 w-5 h-5" />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </motion.div>
          {errors.firstName && touched.firstName && (
            <motion.p
              className="text-red-500 text-sm mt-1 flex items-center gap-1"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <BadgeInfo className="w-4 h-4" />
              {errors.firstName}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          className="flex flex-col"
          variants={scaleUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className={`flex items-center gap-3 shadow-sm rounded-lg border bg-white p-3 transition-all duration-200 ${
              errors.lastName && touched.lastName
                ? "border-red-500 ring-1 ring-red-500"
                : "border-gray-300 hover:border-blue-500 hover:ring-1 hover:ring-blue-500"
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <User className="text-gray-500 w-5 h-5" />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </motion.div>
          {errors.lastName && touched.lastName && (
            <motion.p
              className="text-red-500 text-sm mt-1 flex items-center gap-1"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <BadgeInfo className="w-4 h-4" />
              {errors.lastName}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Email */}
      <motion.div
        className="flex flex-col"
        variants={scaleUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className={`flex items-center gap-3 shadow-sm rounded-lg border bg-white p-3 transition-all duration-200 ${
            errors.email && touched.email
              ? "border-red-500 ring-1 ring-red-500"
              : "border-gray-300 hover:border-blue-500 hover:ring-1 hover:ring-blue-500"
          }`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Mail className="text-gray-500 w-5 h-5" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </motion.div>
        {errors.email && touched.email && (
          <motion.p
            className="text-red-500 text-sm mt-1 flex items-center gap-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <BadgeInfo className="w-4 h-4" />
            {errors.email}
          </motion.p>
        )}
      </motion.div>

      {/* Country & Amount Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Country Dropdown */}
        <motion.div
          className="flex flex-col relative"
          variants={scaleUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <motion.div
            ref={countryDropdownRef}
            className={`relative flex items-center gap-2 shadow-sm rounded-lg border bg-white p-3 transition-all duration-200 ${
              errors.country && touched.country
                ? "border-red-500 ring-1 ring-red-500"
                : "border-gray-300 hover:border-blue-500 hover:ring-1 hover:ring-blue-500"
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <MapPin className="text-gray-500 w-5 h-5 flex-shrink-0" />
            <div
              className="flex-1 cursor-pointer"
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
            >
              <div className="flex justify-between items-center">
                <span>{values.country}</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    showCountryDropdown ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {showCountryDropdown && (
              <motion.div
                className="absolute z-[9999] w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
              >
                <div className="p-2 border-b border-gray-200 sticky top-0 bg-white">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search country..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      autoFocus
                    />
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <motion.div
                        key={country.code}
                        className={`px-4 py-2 cursor-pointer hover:bg-blue-50 flex items-center ${
                          values.country === country.name ? "bg-blue-100" : ""
                        }`}
                        onClick={() => {
                          setFieldValue("country", country.name);
                          setShowCountryDropdown(false);
                          setSearchTerm("");
                        }}
                        whileHover={{ x: 2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="ml-2">{country.name}</span>
                      </motion.div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500 text-center">
                      No countries found
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {errors.country && touched.country && (
            <motion.p
              className="text-red-500 text-sm mt-1 flex items-center gap-1"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <BadgeInfo className="w-4 h-4" />
              {errors.country}
            </motion.p>
          )}
        </motion.div>

        {/* Amount */}

        <motion.div
          className="flex flex-col"
          variants={scaleUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className={`flex items-center flex-1 gap-3 rounded-lg shadow-sm border bg-white ${
              errors.amount && touched.amount
                ? "border-red-500 ring-1 ring-red-500"
                : "border-gray-300 hover:border-blue-500 hover:ring-1 hover:ring-blue-500"
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center gap-3 p-3">
              <HandCoins className="text-gray-500 w-5 h-5" />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent
                [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:m-0 
                [&::-webkit-outer-spin-button]:appearance-none 
                [&::-webkit-inner-spin-button]:m-0 
                [&::-webkit-inner-spin-button]:appearance-none"
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                min="1"
              />
            </div>

            <select
              name="currency"
              className="border-l border-gray-300 pl-3 mr-2 outline-none bg-transparent text-gray-700 cursor-pointer"
              value={values.currency}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </motion.div>
          {errors.amount && touched.amount && (
            <motion.p
              className="text-red-500 text-sm mt-1 flex items-center gap-1"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <BadgeInfo className="w-4 h-4" />
              {errors.amount}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Payment Element */}
      <motion.div
        className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
        variants={scaleUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6 }}
      >
        <PaymentElement className="payment-element" />
      </motion.div>

      {/* Payment Methods Info */}
      <motion.div
        className="bg-blue-50 p-3 rounded-lg flex items-start gap-3"
        variants={scaleUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.7 }}
      >
        <div className="bg-blue-100 p-1.5 rounded-full mt-0.5">
          <BadgeInfo className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-blue-800">
            We accept Visa, Mastercard, American Express, and other major
            payment methods.
          </p>
        </div>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {message && (
          <motion.div
            className="text-red-500 text-sm py-2 px-3 bg-red-50 rounded-md flex items-center gap-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <CircleAlert className="w-4 h-4 flex-shrink-0" />
            <span>{message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <motion.button
        disabled={isProcessing || !stripe}
        id="submit"
        type="submit"
        className={`w-full py-3 px-4 rounded-md font-medium text-white shadow-sm transition-all duration-200 ${
          isProcessing || !stripe
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
        }`}
        variants={scaleUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8 }}
        whileHover={!isProcessing && !stripe ? { scale: 1.01 } : {}}
        whileTap={!isProcessing && !stripe ? { scale: 0.99 } : {}}
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin w-5 h-5" />
            Processing Payment...
          </span>
        ) : (
          `Pay ${values.amount ? `${values.amount} ${values.currency}` : ""}`
        )}
      </motion.button>

      {/* Security Info */}
      <motion.div
        className="flex items-center justify-center gap-2 text-sm text-gray-500"
        variants={scaleUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.9 }}
      >
        <LockKeyhole size={16} className="text-blue-600" />
        <span>Payments are secure and encrypted</span>
      </motion.div>
    </motion.form>
  );
}

export default function StripeCheckout() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState(null);

  // Initialize Stripe
  useEffect(() => {
    const initializeStripe = async () => {
      try {
        const response = await axios.get("http://localhost:3000/stripe-config");
        const { publishableKey } = response.data;
        setStripePromise(loadStripe(publishableKey));
      } catch (err) {
        setError(
          "Failed to initialize payment processor. Please try again later."
        );
        setLoading(false);
      }
    };
    initializeStripe();
  }, []);

  // Create payment intent when form values are available
  useEffect(() => {
    const createPayment = async () => {
      if (!stripePromise) return;

      try {
        // If we have form values, use them, otherwise use default values
        const amount = formValues?.amount ? formValues.amount * 100 : 1000;
        const currency = formValues?.currency
          ? formValues.currency.toLowerCase()
          : "usd";

        const response = await axios.post(
          "http://localhost:3000/create-payment-intent",
          {
            amount,
            currency,
          }
        );

        const { clientSecret } = response.data;
        setClientSecret(clientSecret);
      } catch (err) {
        console.error("Error creating payment intent:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    createPayment();
  }, [stripePromise, formValues]);

  if (error) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gray-100 font-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <CircleAlert className="h-12 w-12 mx-auto" />
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
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-text pt-32">
      <motion.div
        className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8">
          <motion.div
            className="flex justify-center mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-blue-100 p-6 rounded-full shadow-inner">
              <Landmark className="h-10 w-10 text-blue-600" />
            </div>
          </motion.div>
          <motion.h2
            className="text-center text-2xl font-bold text-gray-800 mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Complete Your Donation
          </motion.h2>
          <motion.p
            className="text-center text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Support our cause with a secure payment
          </motion.p>

          {loading ? (
            <motion.div
              className="flex flex-col items-center justify-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HashLoader color="#2563eb" size={60} />
              <p className="mt-4 text-gray-500">Setting up secure payment...</p>
            </motion.div>
          ) : error ? (
            <motion.div
              className="flex flex-col items-center justify-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <CircleAlert className="h-12 w-12 text-red-500 mb-4" />
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          ) : stripePromise && clientSecret ? (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "stripe",
                },
              }}
            >
              <PaymentForm
                clientSecret={clientSecret}
                onFormValuesChange={setFormValues}
              />
            </Elements>
          ) : (
            <motion.div
              className="flex flex-col items-center justify-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader2 className="animate-spin w-10 h-10 text-blue-600 mb-4" />
              <p className="text-gray-500">Almost ready...</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
