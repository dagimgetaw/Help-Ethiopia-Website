import {
  LockKeyhole,
  Loader2,
  ArrowLeft,
  Eye,
  EyeClosed,
  Check,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";

export default function ResetPassword() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [passwordTests, setPasswordTests] = useState({
    lengthTest: false,
    uppercaseTest: false,
    lowercaseTest: false,
    numberTest: false,
    specialTest: false,
  });
  const [confirmPasswordMatch, setConfirmPasswordMatch] = useState(false);

  const { token } = useParams();

  useEffect(() => {
    const tests = {
      lengthTest: password.length >= 8,
      uppercaseTest: /[A-Z]/.test(password),
      lowercaseTest: /[a-z]/.test(password),
      numberTest: /\d/.test(password),
      specialTest: /[\W_]/.test(password),
    };
    setPasswordTests(tests);
    setConfirmPasswordMatch(
      password === confirmPassword && confirmPassword.length > 0
    );
  }, [password, confirmPassword]);

  // eslint-disable-next-line react/prop-types
  const PasswordRequirement = ({ meets, label }) => (
    <motion.div
      className="flex items-center mt-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {meets ? (
        <Check className="h-4 w-4 text-green-500 mr-2" />
      ) : (
        <X className="h-4 w-4 text-red-500 mr-2" />
      )}
      <span className={`text-sm ${meets ? "text-gray-600" : "text-gray-400"}`}>
        {label}
      </span>
    </motion.div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!confirmPasswordMatch) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (!Object.values(passwordTests).every((test) => test)) {
      setErrorMessage("Password does not meet all requirements");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await axios.post(
        `http://localhost:3000/reset-password/${token}`,
        { password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      if (res.data.status === "success") {
        setSuccessMessage(res.data.message);
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
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans"
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
            Reset Password
          </h1>
          <p className="text-gray-600">Enter your new password</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-8 border border-gray-200"
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
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div
                className={`flex items-center gap-3 rounded-md border bg-white p-3 transition-all duration-200 ${
                  errorMessage &&
                  !Object.values(passwordTests).every((test) => test)
                    ? "border-red-500 ring-2 ring-red-200"
                    : "border-gray-300 hover:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"
                }`}
              >
                <LockKeyhole className="text-gray-400 h-5 w-5 flex-shrink-0" />
                <input
                  type={hidePassword ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="Your new password"
                  className="w-full outline-none text-gray-800 placeholder-gray-400 bg-transparent text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  autoComplete="new-password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setHidePassword(!hidePassword)}
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {hidePassword ? (
                    <EyeClosed className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {password && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="mt-2 pl-2"
                >
                  <PasswordRequirement
                    meets={passwordTests.lengthTest}
                    label="At least 8 characters"
                  />
                  <PasswordRequirement
                    meets={passwordTests.uppercaseTest}
                    label="At least one uppercase letter"
                  />
                  <PasswordRequirement
                    meets={passwordTests.lowercaseTest}
                    label="At least one lowercase letter"
                  />
                  <PasswordRequirement
                    meets={passwordTests.numberTest}
                    label="At least one number"
                  />
                  <PasswordRequirement
                    meets={passwordTests.specialTest}
                    label="At least one special character"
                  />
                </motion.div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div
                className={`flex items-center gap-3 rounded-md border bg-white p-3 transition-all duration-200 ${
                  (errorMessage && !confirmPasswordMatch) ||
                  (confirmPassword && !confirmPasswordMatch)
                    ? "border-red-500 ring-2 ring-red-200"
                    : confirmPasswordMatch
                    ? "border-green-500 ring-2 ring-green-200"
                    : "border-gray-300 hover:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"
                }`}
              >
                <LockKeyhole className="text-gray-400 h-5 w-5 flex-shrink-0" />
                <input
                  type={hideConfirmPassword ? "password" : "text"}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm your new password"
                  className="w-full outline-none text-gray-800 placeholder-gray-400 bg-transparent text-sm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isSubmitting}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setHideConfirmPassword(!hideConfirmPassword)}
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {hideConfirmPassword ? (
                    <EyeClosed className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {confirmPassword && !confirmPasswordMatch && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pl-2 pt-1 text-sm text-red-500"
                >
                  Passwords do not match
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              disabled={
                isSubmitting ||
                !confirmPasswordMatch ||
                !Object.values(passwordTests).every((test) => test)
              }
              className={`w-full py-2.5 px-4 rounded-md text-white font-medium flex items-center justify-center transition-all duration-200 ${
                isSubmitting ||
                !confirmPasswordMatch ||
                !Object.values(passwordTests).every((test) => test)
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Password"
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
