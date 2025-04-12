import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-blue-900/60">
      <div className="relative z-3 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl font-medium mb-4"
          >
            <span className="inline-block px-4 py-1 text-lg bg-blue-600 rounded-full font-title">
              1000+ Patients Helped
            </span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold mb-8 leading-tight font-text"
          >
            <span className="text-blue-300">HELP Ethiopia</span>: Unlocking
            Potential, Building Healthcare!
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-12 font-text"
          >
            <Link
              to="/about"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Learn About Our Work
            </Link>
            <Link
              to="/donate"
              className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white/20 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Support Our Mission
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-3"
      >
        <div className="animate-bounce w-8 h-14 border-4 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white mt-2 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}
