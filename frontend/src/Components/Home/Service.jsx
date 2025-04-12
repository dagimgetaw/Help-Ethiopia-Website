import { HandHeart, ShieldCheck, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: <HandHeart size={48} strokeWidth={1.5} className="text-blue-600" />,
    title: "Ye'Eteye Charity",
    description:
      "Our charitable initiative has helped over 1000 patients who struggled to cover their medical bills, primarily from rural areas. We currently operate at Tikur Anbessa Specialised Hospital with recent expansion to Zewditu Memorial Hospital.",
    bgColor: "bg-blue-50",
  },
  {
    icon: (
      <ShieldCheck size={48} strokeWidth={1.5} className="text-green-600" />
    ),
    title: "Quality Improvement",
    description:
      "HELP Ethiopia demonstrates commitment to continuous improvement by implementing impactful programs focusing on streamlining healthcare processes, enriching data-driven decision-making, and optimizing patient experience.",
    bgColor: "bg-green-50",
  },
  {
    icon: (
      <GraduationCap size={48} strokeWidth={1.5} className="text-purple-600" />
    ),
    title: "Education & Leadership",
    description:
      "We invest in the future by empowering the next generation of Ethiopians to become effective healthcare leaders through comprehensive training programs and mentorship initiatives.",
    bgColor: "bg-purple-50",
  },
];

// eslint-disable-next-line react/prop-types
const ServiceCard = ({ icon, title, description, bgColor, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`${bgColor} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full`}
    >
      <div className="flex justify-center">
        <div className="p-4 rounded-full bg-white shadow-sm">{icon}</div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4 text-center">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed text-center">{description}</p>
      <div className="mt-8 text-center">
        <button className="inline-flex items-center px-6 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
          Learn More
        </button>
      </div>
    </motion.div>
  );
};

export default function Service() {
  return (
    <div className="py-16 px-6 md:px-12 lg:px-24 bg-gray-100 font-text">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Core Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Delivering comprehensive healthcare solutions through focused
            initiatives
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} index={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}
