import {
  CreditCard,
  Landmark,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function PayMethods() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const handlePaymentSelect = (option) => {
    setSelectedOption(option);
    if (option === "birr") {
      window.location.href = "/pay-with-chapa";
    } else {
      window.location.href = "/pay-with-stripe";
    }
  };

  return (
    <div className="pb-16 px-6 md:px-12 lg:px-20 xl:px-36 bg-gray-100 font-text">
      <div className="p-8 bg-white shadow-lg rounded-xl max-w-xl mx-auto font-text">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Choose Payment Method
        </h2>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handlePaymentSelect("birr")}
            onHoverStart={() => setHoveredButton("birr")}
            onHoverEnd={() => setHoveredButton(null)}
            className={`w-full p-4 border-2 rounded-lg flex items-center justify-between transition-all duration-200 ${
              selectedOption === "birr"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
            }`}
          >
            <div className="flex items-center">
              <Landmark className="h-6 w-6 text-blue-600 mr-3" />
              <span className="text-md font-medium text-gray-700">
                Donate with Birr
              </span>
            </div>
            <motion.div
              className="text-blue-600 font-medium"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {hoveredButton === "birr" ? (
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronsRight className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.div>
              )}
            </motion.div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handlePaymentSelect("mastercard")}
            onHoverStart={() => setHoveredButton("mastercard")}
            onHoverEnd={() => setHoveredButton(null)}
            className={`w-full p-4 border-2 rounded-lg flex items-center justify-between transition-all duration-200 ${
              selectedOption === "mastercard"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
            }`}
          >
            <div className="flex items-center">
              <CreditCard className="h-6 w-6 text-blue-600 mr-3" />
              <span className="text-md font-medium text-gray-700">
                Donate with Mastercard
              </span>
            </div>
            <motion.div
              className="text-blue-600 font-medium"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {hoveredButton === "mastercard" ? (
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronsRight className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.div>
              )}
            </motion.div>
          </motion.button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Secure payment processing. We never store your payment details.
        </div>
      </div>
    </div>
  );
}
