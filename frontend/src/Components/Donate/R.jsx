import { Mail, Landmark, User, CreditCard } from "lucide-react";
import { useFormik } from "formik";
import { donateSchema } from "../../Schemas/schemas";
import { useState, useRef } from "react";
import StripePayment from "../Payment/StripePayment";
import ChapaPayment from "../Payment/ChapaPayment";
import { useNavigate } from "react-router-dom";

export default function Pay() {
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Birr");
  const chapaFormRef = useRef(null);
  const stripeFormRef = useRef(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      amount: "",
    },
    validationSchema: donateSchema,
    onSubmit: () => {
      if (Object.keys(formik.errors).length === 0) {
        if (paymentMethod === "Birr") {
          chapaFormRef.current?.submit();
        } else {
          stripeFormRef.current?.submit();
          navigate("/success");
        }
      }
    },
  });

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
  } = formik;

  return (
    <div className="my-10 mt-20 p-6 bg-white shadow-lg rounded-xl max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}

        <div className="flex flex-col">
          <div
            className={`flex items-center gap-3 border border-gray-300 bg-white p-3 rounded-lg shadow-md ${
              errors.firstName && touched.firstName
                ? "ring-2 ring-red-500"
                : "hover:ring-2 hover:ring-blue-500"
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
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        <div className="flex flex-col">
          <div
            className={`flex items-center gap-3 border border-gray-300 bg-white p-3 rounded-lg shadow-md ${
              errors.lastName && touched.lastName
                ? "ring-2 ring-red-500"
                : "hover:ring-2 hover:ring-blue-500"
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
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>

        <div className="flex flex-col">
          <div
            className={`flex items-center gap-3 border border-gray-300 bg-white p-3 rounded-lg shadow-md ${
              errors.email && touched.email
                ? "ring-2 ring-red-500"
                : "hover:ring-2 hover:ring-blue-500"
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

        <div className="relative flex flex-col">
          <div
            className={`flex items-center gap-3 border border-gray-300 bg-white p-3 rounded-lg shadow-md ${
              errors.amount && touched.amount
                ? "ring-2 ring-red-500"
                : "hover:ring-2 hover:ring-blue-500"
            }`}
          >
            <Landmark className="text-gray-500" />
            <input
              name="amount"
              placeholder="Enter amount"
              className="w-full outline-none text-gray-700 placeholder-gray-400"
              value={values.amount}
              onChange={handleChange}
              onBlur={handleBlur}
              min="1"
            />
            <span className="absolute right-4 text-gray-500 font-medium">
              {paymentMethod}
            </span>
          </div>
          {errors.amount && touched.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
          )}
        </div>

        {/* Payment Method Selection */}
        <div className="relative flex flex-col">
          <div className="flex items-center gap-3 border border-gray-300 bg-white p-3 rounded-lg shadow-md hover:ring-2 hover:ring-blue-500">
            <CreditCard className="text-gray-500" />
            <select
              className="w-full text-gray-500 outline-none"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Birr">Donate with Birr</option>
              <option value="USDT">Donate with Mastercard</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 mt-6 rounded-lg bg-[#1E3A8A] text-white font-text ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isSubmitting ? "Processing..." : "Proceed to Payment"}
        </button>
      </form>

      {paymentMethod === "Birr" ? (
        <ChapaPayment
          ref={chapaFormRef}
          donatorFirstName={values.firstName}
          donatorLastName={values.lastName}
          donatorEmail={values.email}
          donatedAmount={values.amount}
        />
      ) : (
        <StripePayment
          ref={stripeFormRef}
          donatorFirstName={values.firstName}
          donatorLastName={values.lastName}
          donatorEmail={values.email}
          donatedAmount={values.amount}
        />
      )}
    </div>
  );
}
