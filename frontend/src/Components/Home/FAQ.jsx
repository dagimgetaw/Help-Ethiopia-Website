import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const faqs = [
  {
    title: "How can I contribute to the health initiative?",
    text: "You can contribute in several ways: financial donations through our secure platform, volunteering your time and expertise, or donating medical supplies. We also welcome corporate partnerships and fundraising initiatives. All contributions directly support our medical programs and help us reach more people in need.",
  },
  {
    title: "What types of medical treatments do you provide?",
    text: "We provide comprehensive medical services including emergency care, surgical procedures, maternal health services, pediatric care, chronic disease management, and diagnostic services. Our mobile clinics also offer vaccinations, health education, and basic medical care to remote communities.",
  },
  {
    title: "Can I donate online?",
    text: "Absolutely! We offer a completely secure online donation system that accepts all major credit cards, PayPal, and bank transfers. You can make one-time donations or set up recurring contributions. All donors receive immediate confirmation and a tax receipt via email.",
  },
  {
    title: "How do I know if my donation was used appropriately?",
    text: "We maintain complete transparency through our annual impact reports, financial audits, and regular project updates. Donors receive detailed information about how their funds were used, including photos and stories from beneficiaries. Our financial records are independently audited and available upon request.",
  },
  {
    title: "Is my donation tax-deductible?",
    text: "Yes, all donations to our organization are tax-deductible to the fullest extent allowed by law. We are a registered 501(c)(3) nonprofit in the United States and have similar status in other countries. Donors receive official receipts for tax purposes immediately after contributing.",
  },
  {
    title: "Where is the charity based and where do you operate?",
    text: "Our headquarters are in Addis Ababa, Ethiopia, but we operate programs throughout the country with a focus on underserved rural areas. We partner with local health centers, hospitals, and community organizations to maximize our impact. Our mobile clinics reach even the most remote villages.",
  },
  {
    title: "How can I volunteer with your organization?",
    text: "We welcome medical professionals and non-medical volunteers alike. Medical volunteers must have appropriate credentials. All volunteers complete an application process including background checks. We offer both short-term and long-term opportunities, with options for remote volunteering as well.",
  },
  {
    title: "What percentage of donations goes directly to programs?",
    text: "An average of 87% of every dollar donated goes directly to our programs, with only 13% allocated to administrative and fundraising costs. We pride ourselves on maintaining low overhead while maximizing impact. Detailed financial breakdowns are available in our annual report.",
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="py-16 px-6 md:px-12 lg:px-24 bg-gray-100 font-text">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            FAQ
          </h2>
          <p className="text-md md-text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our work, donations, and how
            you can get involved.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex justify-between items-center p-6 md:p-8 text-left focus:outline-none cursor-pointer"
                aria-expanded={openItems.includes(index)}
                aria-controls={`faq-content-${index}`}
              >
                <h3 className="text-md md:text-lg font-semibold text-gray-800 pr-4">
                  {faq.title}
                </h3>
                <span className="ml-4 flex-shrink-0 text-blue-600">
                  {openItems.includes(index) ? (
                    <ChevronUp size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </span>
              </button>

              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    id={`faq-content-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 md:px-8 pb-6 md:pb-8"
                  >
                    <div className="prose prose-blue max-w-none text-gray-600">
                      <p className="text-md md-text-lg">{faq.text}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Still have questions? We&apos;re here to help.
          </p>
          <Link to={"#contact"}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer">
              Contact Our Team
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
