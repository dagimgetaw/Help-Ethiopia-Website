import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function SuccessRegistration({ handleClearForm }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 font-text">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full text-center border border-gray-100 relative overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 relative"
        >
          <CheckCircle className="text-green-600 w-12 h-12" />
          <motion.div
            className="absolute inset-0 border-4 border-green-500 rounded-full"
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        {/* Content */}
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Thank You! 🎉
        </motion.h2>

        <motion.p
          className="text-gray-600 mb-8 leading-relaxed text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Your registration was submitted successfully. We'll review it and
          contact you soon.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/"
              className="block w-full bg-white text-gray-700 font-medium py-2.5 px-6 rounded-xl border border-gray-200 transition-all duration-200 shadow-sm cursor-pointer"
            >
              ← Return Home
            </Link>
          </motion.div>

          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow: "0 5px 15px rgba(30, 58, 138, 0.3)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={handleClearForm}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium py-2.5 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            Submit Another
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
