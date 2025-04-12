import { motion } from "framer-motion";
import university from "../../assets/aau.webp";
import hospital from "../../assets/anbesa.webp";

const partners = [
  {
    src: university,
    alt: "Addis Ababa University Logo",
    name: "Addis Ababa University",
    description: "Academic partner providing research and training support",
  },
  {
    src: hospital,
    alt: "Tikur Anbesa Hospital Logo",
    name: "Tikur Anbesa Hospital",
    description: "Clinical partner for patient care and medical training",
  },
];

export default function Partner() {
  return (
    <div className="py-16 px-6 md:px-12 lg:px-24 bg-gray-100 font-text">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Our Trusted Partners
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Collaborating with leading institutions to deliver exceptional
            healthcare services
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center max-w-2xl mx-auto">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{
                y: -5,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md h-full cursor-pointer"
            >
              <div className="h-32 flex items-center mb-4">
                <motion.img
                  src={partner.src}
                  alt={partner.alt}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain px-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
                {partner.name}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                {partner.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
