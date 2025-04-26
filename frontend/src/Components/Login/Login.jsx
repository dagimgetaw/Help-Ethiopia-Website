import { Link } from "react-router-dom";
import { Mail, LockKeyhole, Eye, EyeClosed, Loader2 } from "lucide-react";
import { useState } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../../Schemas/schemas";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const [hide, setHide] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  axios.defaults.withCredentials = true;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setErrorMessage("");
      try {
        const res = await axios.post("http://localhost:3000/login", values);
        if (res.data.status === "ok") {
          login(res.data.token, res.data.role, res.data.firstName);
          navigate(res.data.role === "admin" ? "/admin/dashboard" : "/");
        }
      } catch (error) {
        let errorMsg = "An error occurred. Please try again.";
        if (error.response) {
          errorMsg = error.response.data.message || errorMsg;
        } else if (error.request) {
          errorMsg = "No response from server. Please try again.";
        }
        setErrorMessage(errorMsg);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    formik;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-text"
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="mt-1 text-blue-100 text-sm">
              Sign in to access your account
            </p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 space-y-5"
          >
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-4 p-3 bg-rose-50 text-rose-700 rounded-lg border border-rose-200 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-rose-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

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

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-xs text-blue-600 hover:text-blue-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300  ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg cursor-pointer"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-2 text-white" />
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center text-sm">
              <p className="text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
                >
                  Create account
                </Link>
              </p>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </motion.div>
  );
}
