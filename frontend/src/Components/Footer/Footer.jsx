import { Link } from "react-router-dom";
import logo from "../../assets/l.webp";
import { useFormik } from "formik";
import { subscribeSchema } from "../../Schemas/schemas";
import { Mail, CheckCircle } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function Footer() {
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: subscribeSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setErrorMessage(null);

      try {
        // Make API call to your backend
        const response = await axios.post("http://localhost:3000/subscribe", {
          email: values.email,
        });

        if (response.data.subscribedBefore) {
          setMessage("You are already subscribed!");
        }

        if (response.data.newSubscriber) {
          setMessage("Successfully subscribed! Thank you.");
        }

        if (response.data.success) {
          setSubscribed(true);
          resetForm();
        } else {
          setErrorMessage(response.data.message || "Subscription failed");
        }
      } catch (error) {
        console.error("Subscription error:", error);
        setErrorMessage(
          error.response?.data?.message ||
            error.message ||
            "Failed to subscribe. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = formik;

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 w-full bg-gray-800 font-text">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-8 items-center">
          <div className="text-center lg:text-left flex-1 max-w-md">
            <img
              src={logo}
              alt="Help Ethiopia Logo"
              loading="lazy"
              className="mx-auto lg:mx-0 w-20 h-auto"
            />
            <p className="text-gray-300 text-sm sm:text-base pt-4">
              We advocate for quality education, nurture leadership, and forge
              collaborations for sustainable healthcare.
            </p>
          </div>
          <div className="flex-1 ">
            <div className="text-center">
              <h3 className="text-white font-medium text-lg">Subscribe</h3>
              <p className="text-gray-300 text-sm sm:text-base pt-2">
                Sign up with your email address to receive news and updates.
              </p>
            </div>
            {subscribed ? (
              <div className="mt-6 p-4 bg-green-100 rounded-lg flex items-center justify-center gap-3">
                <CheckCircle className="text-green-600" />
                <span className="text-green-800 font-medium">{message}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4">
                {errorMessage && (
                  <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
                    {errorMessage}
                  </div>
                )}
                <div className="flex flex-col">
                  <div
                    className={`flex items-center gap-3 shadow-md rounded-lg border ${
                      errors.email && touched.email
                        ? "border-red-500 ring-2 ring-red-200"
                        : "border-gray-400 hover:border-blue-400"
                    } bg-white px-3 py-2 transition-all`}
                  >
                    <Mail className="text-gray-500 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email address"
                      className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.email && touched.email && (
                    <p className="text-red-400 text-sm mt-1 text-center">
                      {errors.email}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className={`w-full py-3 mt-4 rounded-lg text-white font-medium transition-colors ${
                    isSubmitting || loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
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
                    "Subscribe"
                  )}
                </button>
              </form>
            )}
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="flex gap-4 sm:gap-6">
              <Link
                to="https://www.facebook.com/profile.php?id=100092545625116"
                target="_blank"
                aria-label="Facebook"
                className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png"
                  alt="Facebook"
                  loading="lazy"
                  className="w-10 h-10"
                />
              </Link>
              <Link
                to="https://twitter.com/YeEteyeCharity?s=35"
                target="_blank"
                aria-label="Twitter"
                className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/ffffff/twitterx.png"
                  alt="Twitter"
                  loading="lazy"
                  className="w-10 h-10"
                />
              </Link>
              <Link
                to="https://www.instagram.com/p/Cr1NJ15o9pS/?igshid=YmMyMTA2M2Y="
                target="_blank"
                aria-label="Instagram"
                className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png"
                  alt="Instagram"
                  loading="lazy"
                  className="w-10 h-10"
                />
              </Link>
              <Link
                to="https://t.me/help_for_eth"
                target="_blank"
                aria-label="Telegram"
                className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/ffffff/telegram.png"
                  alt="Telegram"
                  loading="lazy"
                  className="w-10 h-10"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* About Text */}
        <p className="mt-12 text-gray-300 text-sm sm:text-base leading-relaxed">
          HELP Ethiopia is a multi-disciplinary organization registered and
          accorded legal personality in Ethiopia. We have a dedicated charity
          program targeting economically disadvantaged groups of our society,
          known as Ye&apos;Eteye Charity. Furthermore, we advocate for quality
          education, leadership, and collaboration as a tool for sustainable
          healthcare and societal development. Hence the name &quot;HELP&quot;
          which stands for Health, Education, Leadership, and Partnership.
        </p>

        <div className="border-t border-gray-600 mt-8 mb-6 w-full"></div>

        <div className="flex flex-col sm:flex-row justify-between items-center text-gray-400 text-xs sm:text-sm">
          <p>Copyright © {new Date().getFullYear()} Help Ethiopia</p>
          <p className="mt-2 sm:mt-0">Powered by Help Ethiopia</p>
        </div>
      </div>
    </footer>
  );
}
