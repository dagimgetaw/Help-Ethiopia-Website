import { Link } from "react-router-dom";
import {
  Mail,
  LockKeyhole,
  User,
  Eye,
  EyeClosed,
  Check,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { signupSchema } from "../../Schemas/schemas";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function Signup() {
  const [hide, setHide] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);
  const [passwordTests, setPasswordTests] = useState({
    lengthTest: false,
    uppercaseTest: false,
    lowercaseTest: false,
    numberTest: false,
    specialTest: false,
  });
  const [confirmPasswordMatch, setConfirmPasswordMatch] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const navigate = useNavigate();

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 5000);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values, actions) => {
      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        await axios.post("http://localhost:3000/signup", values);

        showNotification(
          "Account created successfully! Redirecting...",
          "success"
        );

        setTimeout(() => {
          actions.resetForm();
          navigate("/login");
        }, 2000);
      } catch (error) {
        let errorMsg = "An error occurred. Please try again.";
        if (error.response) {
          if (
            error.response.status === 400 &&
            error.response.data.message ===
              "User with this email already registered"
          ) {
            errorMsg =
              "This email is already registered. Please use a different email or login.";
          } else {
            errorMsg = error.response.data.message || errorMsg;
          }
        } else if (error.request) {
          errorMsg = "No response from server. Please try again.";
        }
        showNotification(errorMsg, "error");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    formik;

  useEffect(() => {
    const password = values.password;
    const tests = {
      lengthTest: password.length >= 8,
      uppercaseTest: /[A-Z]/.test(password),
      lowercaseTest: /[a-z]/.test(password),
      numberTest: /\d/.test(password),
      specialTest: /[\W_]/.test(password),
    };
    setPasswordTests(tests);
    setConfirmPasswordMatch(
      values.password === values.confirmPassword &&
        values.confirmPassword.length > 0
    );
  }, [values.password, values.confirmPassword]);

  // eslint-disable-next-line react/prop-types
  const PasswordRequirement = ({ meets, label }) => (
    <motion.div
      className="flex items-center mt-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {meets ? (
        <Check className="h-4 w-4 text-emerald-500 mr-2" />
      ) : (
        <X className="h-4 w-4 text-rose-500 mr-2" />
      )}
      <span className={`text-xs ${meets ? "text-gray-600" : "text-gray-400"}`}>
        {label}
      </span>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-30 pb-20 bg-gray-100 flex items-center justify-center p-4 font-text">
      <div className="w-full max-w-md">
        <AnimatePresence>
          {notification.show && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className={`rounded-lg p-4 mb-6 shadow-md ${
                notification.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-rose-50 text-rose-800 border border-rose-200"
              }`}
            >
              <div className="flex items-center">
                {notification.type === "success" ? (
                  <Check className="h-5 w-5 mr-2 text-emerald-600" />
                ) : (
                  <X className="h-5 w-5 mr-2 text-rose-600" />
                )}
                <span className="text-sm font-medium">
                  {notification.message}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
            <h2 className="text-2xl font-bold text-white">
              Create Your Account
            </h2>
            <p className="mt-1 text-blue-100 text-sm">
              Join our community and start your journey
            </p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 space-y-5"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <div
                  className={`flex items-center gap-3 rounded-lg border bg-gray-50 p-3 transition-all duration-200 ${
                    errors.firstName && touched.firstName
                      ? "border-rose-500 ring-1 ring-rose-200"
                      : "border-gray-200 hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200"
                  }`}
                >
                  <User className="text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Abebe"
                    className="w-full outline-none text-gray-800 placeholder-gray-400 bg-transparent text-sm"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.firstName && touched.firstName && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-rose-500"
                  >
                    {errors.firstName}
                  </motion.p>
                )}
              </div>

              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <div
                  className={`flex items-center gap-3 rounded-lg border bg-gray-50 p-3 transition-all duration-200 ${
                    errors.lastName && touched.lastName
                      ? "border-rose-500 ring-1 ring-rose-200"
                      : "border-gray-200 hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200"
                  }`}
                >
                  <User className="text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Kebede"
                    className="w-full outline-none text-gray-800 placeholder-gray-400 bg-transparent text-sm"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.lastName && touched.lastName && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-rose-500"
                  >
                    {errors.lastName}
                  </motion.p>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div
                className={`flex items-center gap-3 rounded-lg border bg-gray-50 p-3 transition-all duration-200 ${
                  errors.email && touched.email
                    ? "border-rose-500 ring-1 ring-rose-200"
                    : "border-gray-200 hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200"
                }`}
              >
                <Mail className="text-gray-400 h-4 w-4" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="abebe@example.com"
                  className="w-full outline-none text-gray-800 placeholder-gray-400 bg-transparent text-sm"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.email && touched.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-rose-500"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div
                className={`flex items-center gap-3 rounded-lg border bg-gray-50 p-3 transition-all duration-200 ${
                  errors.password && touched.password
                    ? "border-rose-500 ring-1 ring-rose-200"
                    : "border-gray-200 hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200"
                }`}
              >
                <LockKeyhole className="text-gray-400 h-4 w-4" />
                <input
                  type={hide ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full outline-none text-gray-800 placeholder-gray-400 bg-transparent text-sm"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  onClick={() => setHide(!hide)}
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  {hide ? (
                    <EyeClosed className="h-4 w-4 cursor-pointer" />
                  ) : (
                    <Eye className="h-4 w-4 cursor-pointer" />
                  )}
                </button>
              </div>
              {values.password && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <PasswordRequirement
                      meets={passwordTests.lengthTest}
                      label="8+ characters"
                    />
                    <PasswordRequirement
                      meets={passwordTests.uppercaseTest}
                      label="Uppercase"
                    />
                    <PasswordRequirement
                      meets={passwordTests.lowercaseTest}
                      label="Lowercase"
                    />
                    <PasswordRequirement
                      meets={passwordTests.numberTest}
                      label="Number"
                    />
                    <PasswordRequirement
                      meets={passwordTests.specialTest}
                      label="Special char"
                    />
                  </div>
                </motion.div>
              )}
              {errors.password && touched.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-rose-500"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div
                className={`flex items-center gap-3 rounded-lg border bg-gray-50 p-3 transition-all duration-200 ${
                  (errors.confirmPassword && touched.confirmPassword) ||
                  (values.confirmPassword && !confirmPasswordMatch)
                    ? "border-rose-500 ring-1 ring-rose-200"
                    : confirmPasswordMatch
                    ? "border-emerald-500 ring-1 ring-emerald-200"
                    : "border-gray-200 hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200"
                }`}
              >
                <LockKeyhole className="text-gray-400 h-4 w-4" />
                <input
                  type={hideConfirm ? "password" : "text"}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="w-full outline-none text-gray-800 placeholder-gray-400 bg-transparent text-sm"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  onClick={() => setHideConfirm(!hideConfirm)}
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  {hideConfirm ? (
                    <EyeClosed className="h-4 w-4 cursor-pointer" />
                  ) : (
                    <Eye className="h-4 w-4 cursor-pointer" />
                  )}
                </button>
              </div>
              {values.confirmPassword && !confirmPasswordMatch && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-rose-500"
                >
                  Passwords do not match
                </motion.p>
              )}
              {errors.confirmPassword && touched.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-rose-500"
                >
                  {errors.confirmPassword}
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg cursor-pointer"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  Creating Account...
                </span>
              ) : (
                <span>Create Account</span>
              )}
            </button>

            <div className="text-center text-sm">
              <p className="text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}
