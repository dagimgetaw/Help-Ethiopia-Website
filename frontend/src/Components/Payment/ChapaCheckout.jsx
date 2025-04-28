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
  Loader2,
  BadgeInfo,
  RefreshCw,
} from "lucide-react";
import { useFormik } from "formik";
import { donateSchema } from "../../Schemas/schemas";
import { motion } from "framer-motion";
import Spinner from "../Spinner/Spinner";
import ReactDOM from "react-dom";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const scaleUp = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

const PaymentForm = ({
  paymentData,
  isProcessing,
  chapaPublicKey,
  isValid,
  onSubmit,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    onSubmit(e);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="space-y-6"
    >
      <form
        method="POST"
        action="https://api.chapa.co/v1/hosted/pay"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="public_key" value={paymentData.public_key} />
        <input type="hidden" name="tx_ref" value={paymentData.tx_ref} />
        <input type="hidden" name="amount" value={paymentData.amount} />
        <input type="hidden" name="currency" value={paymentData.currency} />
        <input type="hidden" name="email" value={paymentData.email} />
        <input type="hidden" name="first_name" value={paymentData.first_name} />
        <input type="hidden" name="last_name" value={paymentData.last_name} />
        <input type="hidden" name="title" value={paymentData.title} />
        <input
          type="hidden"
          name="description"
          value={paymentData.description}
        />
        <input type="hidden" name="logo" value={paymentData.logo} />
        <input
          type="hidden"
          name="callback_url"
          value={paymentData.callback_url}
        />
        <input type="hidden" name="return_url" value={paymentData.return_url} />
        <input
          type="hidden"
          name="meta[title]"
          value={paymentData.meta_title}
        />
        <motion.button
          type="submit"
          disabled={isProcessing || !chapaPublicKey || !isValid}
          className={`w-full py-3 px-4 rounded-md font-medium text-white shadow-sm transition-all duration-200 ${
            isProcessing || !chapaPublicKey || !isValid
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg cursor-pointer"
          }`}
          whileHover={!isProcessing && isValid ? { scale: 1.02 } : {}}
          whileTap={!isProcessing && isValid ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin w-5 h-5" />
              Processing Payment...
            </span>
          ) : (
            `Pay ${paymentData.amount ? `${paymentData.amount} Birr` : ""}`
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default function ChapaCheckout() {
  const [chapaPublicKey, setChapaPublicKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countryCode, setCountryCode] = useState("+2519");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const fetchChapaConfig = async () => {
      try {
        const response = await fetch("http://localhost:3000/chapa-config");
        if (!response.ok) throw new Error("Failed to fetch Chapa config");
        const { publishableKey } = await response.json();
        setChapaPublicKey(publishableKey);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchChapaConfig();
  }, []);

  const validatePhoneNumber = (value) => {
    if (!value) return "Required";
    if (!/^\d{8}$/.test(value)) return "Must be 8 digits";
    return null;
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const form = e.target;
      // Add a small delay to ensure the loading state is visible
      await new Promise((resolve) => setTimeout(resolve, 500));
      form.submit();
    } catch (err) {
      setError(err.message || "Failed to submit payment");
      setIsProcessing(false);
    }
  };

  const generateSuccessUrl = (values, amount, tx_ref) => {
    const fullPhoneNumber = `${countryCode}${values.phoneNumber}`;
    const params = new URLSearchParams();

    params.append("firstName", values.firstName);
    params.append("lastName", values.lastName);
    params.append("email", values.email);
    params.append("phoneNumber", fullPhoneNumber);
    params.append("amount", amount);
    params.append("tx_ref", tx_ref);
    params.append("paymentDate", new Date().toISOString());

    return `${
      window.location.origin
    }/chapa-payment-success?${params.toString()}`;
  };
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
      setIsProcessing(true);
      setError(null);

      try {
        if (!chapaPublicKey) {
          throw new Error("Payment system not ready");
        }

        // Validate form values
        if (
          !values.firstName ||
          !values.lastName ||
          !values.email ||
          !values.phoneNumber ||
          !values.amount
        ) {
          setIsValid(false);
          setIsProcessing(false);
          return setError("Please fill in all required fields");
        }

        const amount = Number(values.amount);
        if (isNaN(amount) || amount < 10) {
          setIsValid(false);
          setIsProcessing(false);
          return setError("Invalid amount. Minimum amount is 10 Birr");
        }

        setIsValid(true);
        const tx_ref = `CHAPA-${values.amount}-${
          Math.floor(Math.random() * 100000) + 1
        }`;

        const paymentData = {
          public_key: chapaPublicKey,
          tx_ref: tx_ref,
          amount: amount,
          currency: "ETB",
          email: values.email,
          first_name: values.firstName,
          last_name: values.lastName,
          title: "Donation",
          description: "Paying with Confidence with Chapa",
          logo: "https://chapa.link/asset/images/chapa_swirl.svg",
          callback_url: `${window.location.origin}/api/chapa-callback`,
          return_url: generateSuccessUrl(values, amount, tx_ref),
          meta_title: "Donation",
        };

        // Create a temporary div to render the form
        const tempDiv = document.createElement("div");
        const form = (
          <PaymentForm
            paymentData={paymentData}
            isProcessing={isProcessing}
            chapaPublicKey={chapaPublicKey}
            isValid={isValid}
            onSubmit={handlePaymentSubmit}
          />
        );
        ReactDOM.render(form, tempDiv);

        // Submit the form
        tempDiv.querySelector("form").submit();

        // Clean up
        ReactDOM.unmountComponentAtNode(tempDiv);
        tempDiv.remove();
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Payment failed"
        );
        setIsProcessing(false);
      }
    },
  });

  // Update isValid state when form values change
  useEffect(() => {
    const { firstName, lastName, email, phoneNumber, amount } = formik.values;
    const isValidAmount = Number(amount) >= 10;
    setIsValid(
      Boolean(
        firstName && lastName && email && phoneNumber && amount && isValidAmount
      )
    );
  }, [formik.values]);

  const { values, handleChange, handleBlur, errors, touched } = formik;

  if (loading) {
    return <Spinner />;
  }

  if (error && !chapaPublicKey) {
    return (
      <div className="min-h-screen flex items-center justify-center font-text bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="text-yellow-500 mb-4">
            <CircleAlert className="h-12 w-12 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Payment System Unavailable
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center font-text bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <CircleAlert className="h-12 w-12 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Error
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => setError(null)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-30 pb-20 flex items-center justify-center font-text bg-gray-100">
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

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div
                  className={`flex items-center gap-3 shadow-sm rounded-lg border bg-white p-3 transition-all duration-200 ${
                    errors.firstName && touched.firstName
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-gray-300 hover:border-blue-500 hover:ring-1 hover:ring-blue-500"
                  }`}
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
                    disabled={isProcessing}
                  />
                </div>
                {errors.firstName && touched.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </motion.div>

              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div
                  className={`flex items-center gap-3 shadow-sm rounded-lg border bg-white p-3 transition-all duration-200 ${
                    errors.lastName && touched.lastName
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-gray-300 hover:border-blue-500 hover:ring-1 hover:ring-blue-500"
                  }`}
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
                    disabled={isProcessing}
                  />
                </div>
                {errors.lastName && touched.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </motion.div>
            </div>

            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div
                className={`flex items-center gap-3 shadow-sm rounded-lg border bg-white p-3 transition-all duration-200 ${
                  errors.email && touched.email
                    ? "border-red-500 ring-1 ring-red-500"
                    : "border-gray-300 hover:border-blue-500 hover:ring-1 hover:ring-blue-500"
                }`}
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
                  disabled={isProcessing}
                />
              </div>
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div
                  className={`flex items-center gap-2 shadow-sm rounded-lg border bg-white p-3 transition-all duration-200 ${
                    errors.phoneNumber && touched.phoneNumber
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-gray-300 hover:border-blue-500 hover:ring-1 hover:ring-blue-500"
                  }`}
                >
                  <Phone className="text-gray-500 w-5 h-5 flex-shrink-0" />
                  <div className="relative flex items-center w-32">
                    <select
                      className="appearance-none bg-transparent pl-2 pr-5 text-gray-700 focus:outline-none cursor-pointer w-full"
                      aria-label="Country code"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      disabled={isProcessing}
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
                    type="tel"
                    name="phoneNumber"
                    placeholder="12345678"
                    className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent
                              [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:m-0 
                              [&::-webkit-outer-spin-button]:appearance-none 
                              [&::-webkit-inner-spin-button]:m-0 
                              [&::-webkit-inner-spin-button]:appearance-none"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={(e) => {
                      handleBlur(e);
                      formik.setFieldError(
                        "phoneNumber",
                        validatePhoneNumber(e.target.value)
                      );
                    }}
                    maxLength="8"
                    disabled={isProcessing}
                  />
                </div>
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </motion.div>

              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div
                  className={`flex items-center gap-3 shadow-sm rounded-lg border bg-white p-3 transition-all duration-200 ${
                    errors.amount && touched.amount
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-gray-300 hover:border-blue-500 hover:ring-1 hover:ring-blue-500"
                  }`}
                >
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
                    max="1000000"
                    step="1"
                    disabled={isProcessing}
                  />
                  <p className="ml-auto text-sm text-gray-700">Birr</p>
                </div>
                {errors.amount && touched.amount && (
                  <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                )}
              </motion.div>
            </div>

            <motion.div
              className="bg-blue-50 p-3 rounded-lg flex items-center gap-3"
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
                  We accept local bank transactions and mobile money payments.
                </p>
              </div>
            </motion.div>
            <div className="mt-6">
              <PaymentForm
                paymentData={{
                  public_key: chapaPublicKey,
                  tx_ref: `CHAPA-${values.amount}-${
                    Math.floor(Math.random() * 100000) + 1
                  }`,
                  amount: values.amount,
                  currency: "ETB",
                  email: values.email,
                  first_name: values.firstName,
                  last_name: values.lastName,
                  title: "Donation",
                  description: "Paying with Confidence with Chapa",
                  logo: "https://chapa.link/asset/images/chapa_swirl.svg",
                  callback_url: `${window.location.origin}/api/chapa-callback`,
                  return_url: generateSuccessUrl(
                    values,
                    values.amount,
                    `CHAPA-${values.amount}-${
                      Math.floor(Math.random() * 100000) + 1
                    }`
                  ),
                  meta_title: "Donation",
                }}
                isProcessing={isProcessing}
                chapaPublicKey={chapaPublicKey}
                isValid={isValid}
                onSubmit={handlePaymentSubmit}
              />
            </div>

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
          </div>
        </div>
      </motion.div>
    </div>
  );
}
