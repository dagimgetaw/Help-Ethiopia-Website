import CountUp from "react-countup";
import { motion } from "framer-motion";

export default function States() {
  return (
    <div className="pb-16 px-6 md:px-12 lg:px-24 bg-gray-100 font-text">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Impact
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Measuring success through tangible results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-lg text-center"
          >
            <h3 className="text-5xl md:text-7xl font-bold text-gray-700 mb-4">
              <CountUp start={0} end={10} duration={2.5} />+
            </h3>
            <p className="text-lg font-medium text-gray-700">Active Programs</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-8 rounded-lg text-center"
          >
            <h3 className="text-5xl md:text-7xl font-bold text-gray-700 mb-4">
              <CountUp start={0} end={100} duration={2.5} />+
            </h3>
            <p className="text-lg font-medium text-gray-700">Volunteers</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="p-8 rounded-lg text-center"
          >
            <h3 className="text-5xl md:text-7xl font-bold text-gray-700 mb-4">
              <CountUp start={0} end={1000} duration={2.5} />+
            </h3>
            <p className="text-lg font-medium text-gray-700">Patients Helped</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
