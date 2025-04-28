import { MapPin, Phone, Mail, User, Pencil, Send } from "lucide-react";
import { useFormik } from "formik";
import { contactSchema } from "../../Schemas/schemas";
import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const openGoogleMaps = () => {
    const url =
      "https://www.google.com/maps/search/?api=1&query=Tikur+Ambessa+Teaching+Hospital,Addis+Ababa";
    window.open(url, "_blank");
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      message: "",
    },
    validationSchema: contactSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        const response = await axios.post(
          "http://localhost:3000/send-message",
          values
        );

        if (response.data.success) {
          setSuccessMessage(
            response.data.message || "Your message has been sent successfully!"
          );
          resetForm();
        } else {
          throw new Error(response.data.message || "Failed to send message");
        }
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message ||
            error.message ||
            "Failed to send message. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="py-12 px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-48 bg-gray-100 font-text">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or want to get involved? Reach out to us and
            we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-2/5">
            <div className="bg-white p-8 rounded-xl shadow-lg h-full">
              <h2 className="text-2xl font-semibold text-gray-800 pb-6 mb-6 border-b border-gray-200">
                Contact Information
              </h2>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-blue-50 p-3 rounded-full mr-4">
                    <MapPin className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      Our Location
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Tikur Ambessa Teaching Hospital, Zambia Street, Addis
                      Ababa, Ethiopia
                    </p>
                    <button
                      onClick={openGoogleMaps}
                      className="text-blue-600 hover:text-blue-800 font-semibold mt-2 transition-colors cursor-pointer"
                    >
                      View on Google Maps
                    </button>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-50 p-3 rounded-full mr-4">
                    <Phone className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      Phone Number
                    </h3>
                    <p className="text-gray-600 mt-1">+251-939-808-182</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-50 p-3 rounded-full mr-4">
                    <Mail className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      Email Address
                    </h3>
                    <p className="text-gray-600 mt-1">
                      helpforethiopia@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 pb-6 mb-6 border-b border-gray-200">
                Send Us a Message
              </h2>

              {successMessage && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={formik.handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="text-gray-400" size={20} />
                      </div>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Abebe Kebede"
                        className={`pl-10 w-full px-4 py-3 rounded-lg border ${
                          formik.touched.fullName && formik.errors.fullName
                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        } focus:outline-none focus:ring-2`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fullName}
                      />
                    </div>
                    {formik.touched.fullName && formik.errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="text-gray-400" size={20} />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="abebe@example.com"
                        className={`pl-10 w-full px-4 py-3 rounded-lg border ${
                          formik.touched.email && formik.errors.email
                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        } focus:outline-none focus:ring-2`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Message
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                        <Pencil className="text-gray-400" size={20} />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        placeholder="Type your message here..."
                        className={`pl-10 w-full px-4 py-3 rounded-lg border ${
                          formik.touched.message && formik.errors.message
                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        } focus:outline-none focus:ring-2`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.message}
                      />
                    </div>
                    {formik.touched.message && formik.errors.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.message}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-gray-500 text-right">
                      {formik.values.message.length}/200 characters
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading || !formik.isValid}
                      className={`w-full flex justify-center items-center py-3 px-6 rounded-lg text-white font-medium ${
                        loading || !formik.isValid
                          ? "bg-blue-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg cursor-pointer"
                      }`}
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2" size={18} />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
