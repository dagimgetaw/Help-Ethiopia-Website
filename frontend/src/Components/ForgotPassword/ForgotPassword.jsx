import { Mail, Loader2, ArrowLeft } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ForgotPassword() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setErrorMessage("");
      setSuccessMessage("");

      try {
        const res = await axios.post(
          "http://localhost:3000/forgot-password",
          { email: values.email },
          {
            headers: {
              "Content-Type": "application/json",
            },
            timeout: 10000,
          }
        );

        if (res.data.status === "success") {
          setSuccessMessage(res.data.message);
          formik.resetForm();
        }
      } catch (error) {
        let errorMsg = "An error occurred. Please try again.";

        if (error.response) {
          if (error.response.status === 429) {
            errorMsg = "Too many requests. Please wait before trying again.";
          } else {
            errorMsg = error.response.data.message || errorMsg;
          }
        } else if (error.request) {
          if (error.code === "ECONNABORTED") {
            errorMsg = "Request timed out. Please check your connection.";
          } else {
            errorMsg = "No response from server. Please check your connection.";
          }
        }

        setErrorMessage(errorMsg);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-100 flex items-center justify-center pt-30 pb-20 p-4 font-text"
    >
      <div className="w-full max-w-md mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <Link
            to="/login"
            className="flex items-center justify-start text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to login
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Forgot Password
          </h1>
          <p className="text-gray-600">
            Enter your email to receive a reset link
          </p>
        </motion.div>

        <motion.form
          onSubmit={formik.handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-8 border border-gray-200"
          noValidate
        >
          <AnimatePresence mode="wait">
            {errorMessage && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-start text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {successMessage && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-start text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{successMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div
                className={`flex items-center gap-3 rounded-md border bg-white p-3 transition-all duration-200 ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-300 focus-within:ring-2 focus-within:ring-red-200"
                    : "border-gray-300 hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"
                }`}
              >
                <Mail className="text-gray-400 h-5 w-5 flex-shrink-0" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="your@email.com"
                  className="w-full outline-none text-gray-800 placeholder-gray-400 bg-transparent text-sm"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isSubmitting}
                  autoComplete="email"
                  autoFocus
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-500 pl-1"
                >
                  {formik.errors.email}
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !formik.isValid}
              className={`w-full py-2.5 px-4 rounded-md text-white font-medium flex items-center justify-center transition-all duration-200 ${
                isSubmitting || !formik.isValid
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending reset link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6 text-sm text-gray-500"
        >
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign in
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
