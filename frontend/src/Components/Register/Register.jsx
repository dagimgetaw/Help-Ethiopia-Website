import {
  Mail,
  User,
  VenusAndMars,
  Calendar1,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  Phone,
  MapPin,
  Search,
  Info,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { useFormik } from "formik";
import { registerSchema } from "../../Schemas/schemas";
import { useState, useRef, useEffect } from "react";
import region from "./Region";
import logo from "../../assets/logo.webp";
import { Link } from "react-router-dom";
import SuccessRegistration from "./SuccessRegistration";
import axios from "axios";

export default function Register() {
  const [countryCode, setCountryCode] = useState("+2519");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const countryDropdownRef = useRef(null);

  const openGoogleForm = () => {
    const url =
      "https://docs.google.com/forms/d/e/1FAIpQLSdrs5g5p9E9yG_6PbK9dr-nF1NaoFrMI96VY6U4HHOcwE2obQ/viewform";
    window.open(url, "_blank");
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      birthYear: "",
      phoneNumber: "",
      country: "",
      employmentStatus: "",
      fieldOfWork: "",
      organization: "",
      interests: [],
      agreement: false,
      registrationType: "regular",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true);
        setMessage("");

        const payload = {
          ...values,
          phoneNumber: countryCode + values.phoneNumber,
          fieldOfWork: values.fieldOfWork || "Unknown",
          organization: values.organization || "Unknown",
        };

        const response = await axios.post(
          "http://localhost:3000/register",
          payload,
          {
            timeout: 10000,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          setFormSubmitted(true);
          resetForm();
        }
      } catch (error) {
        console.error("Error submitting form:", error);

        if (error.response) {
          if (error.response.data?.alreadyRegistered) {
            setMessage("This email is already registered");
          } else {
            setMessage(error.response.data?.message || "Submission failed");
          }
        } else if (error.request) {
          setMessage("Network error. Please try again.");
        } else {
          setMessage("An unexpected error occurred.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = formik;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [countryDropdownRef]);

  const filteredCountries = region.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInterestChange = (interest) => {
    const currentInterests = [...values.interests];
    if (currentInterests.includes(interest)) {
      const index = currentInterests.indexOf(interest);
      currentInterests.splice(index, 1);
    } else {
      currentInterests.push(interest);
    }
    setFieldValue("interests", currentInterests);
  };

  const handleClearForm = () => {
    formik.resetForm();
    setFormSubmitted(false);
  };

  if (formSubmitted) {
    return <SuccessRegistration handleClearForm={handleClearForm} />;
  }

  return (
    <div className="bg-gray-100 min-h-screen font-text">
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="text-center mb-12 pt-20">
          <div className="inline-block p-3 mb-4">
            <img src={logo} alt="HELP Ethiopia" className="h-16" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Volunteer & Membership Registration
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join HELP Ethiopia in our mission to create a prosperous nation with
            knowledgeable, skilled, and disciplined citizens.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* First Name */}
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">First Name</p>
                <div
                  className={`relative rounded-md shadow-sm ${
                    errors.firstName && touched.firstName
                      ? "border-red-500"
                      : ""
                  }`}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Your first name"
                    className={`block w-full pl-10 pr-3 py-3 border border-gray-300 bg-white p-3 ${
                      errors.firstName && touched.firstName
                        ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    } rounded-md`}
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.firstName && touched.firstName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">Last Name</p>
                <div
                  className={`relative rounded-md shadow-sm ${
                    errors.lastName && touched.lastName ? "border-red-500" : ""
                  }`}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Your last name"
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.lastName && touched.lastName
                        ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    } rounded-md`}
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.lastName && touched.lastName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.lastName}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <p className="block text-sm font-medium text-gray-700">
                  Gender
                </p>
                <div
                  className={`relative rounded-md shadow-sm ${
                    errors.gender && touched.gender ? "border-red-500" : ""
                  }`}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <VenusAndMars className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="gender"
                    name="gender"
                    aria-label="Select your gender"
                    className={`block w-full pl-10 pr-10 py-3 border ${
                      errors.gender && touched.gender
                        ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    } rounded-md appearance-none`}
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select your gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                {errors.gender && touched.gender && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.gender}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">Email</p>
                <div
                  className={`relative rounded-md shadow-sm ${
                    errors.email && touched.email ? "border-red-500" : ""
                  }`}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.email && touched.email
                        ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    } rounded-md`}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.email && touched.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">
                  Birth Year (GC)
                </p>
                <div
                  className={`relative rounded-md shadow-sm ${
                    errors.birthYear && touched.birthYear
                      ? "border-red-500"
                      : ""
                  }`}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar1 className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="birthYear"
                    name="birthYear"
                    type="number"
                    placeholder="e.g. 1990"
                    min="1900"
                    max={new Date().getFullYear()}
                    className={`block w-full pl-10 pr-3 py-3 border 
                                [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:m-0 
                                [&::-webkit-outer-spin-button]:appearance-none 
                                [&::-webkit-inner-spin-button]:m-0 
                                [&::-webkit-inner-spin-button]:appearance-none ${
                                  errors.birthYear && touched.birthYear
                                    ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                } rounded-md`}
                    value={values.birthYear}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.birthYear && touched.birthYear && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.birthYear}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <p className="block text-sm font-medium text-gray-700">
                  Phone Number
                </p>
                <div
                  className={`relative rounded-md shadow-sm ${
                    errors.phoneNumber && touched.phoneNumber
                      ? "border-red-500"
                      : ""
                  }`}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex pl-10">
                    <select
                      className="w-24 border-r border-gray-300 rounded-l-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pl-2 cursor-pointer"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                    >
                      <option value="+2519">+2519</option>
                      <option value="+2517">+2517</option>
                    </select>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      placeholder="12345678"
                      maxLength="8"
                      className={`flex-1 block w-full pl-3 pr-3 py-3 border
                                [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:m-0 
                                [&::-webkit-outer-spin-button]:appearance-none 
                                [&::-webkit-inner-spin-button]:m-0 
                                [&::-webkit-inner-spin-button]:appearance-none ${
                                  errors.phoneNumber && touched.phoneNumber
                                    ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                } rounded-r-md`}
                      value={values.phoneNumber}
                      onChange={(e) => {
                        const input = e.target.value.replace(/\D/g, "");
                        setFieldValue("phoneNumber", input);
                      }}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">Country</p>
                <div
                  ref={countryDropdownRef}
                  className={`relative rounded-md shadow-sm ${
                    errors.country && touched.country ? "border-red-500" : ""
                  }`}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <div
                    className={`block w-full pl-10 pr-10 py-3 border ${
                      errors.country && touched.country
                        ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    } rounded-md cursor-pointer text-left`}
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  >
                    {values.country || "Select your country"}
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>

                  {showCountryDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-300 max-h-60 overflow-auto">
                      <div className="p-2 sticky top-0 bg-white border-b border-gray-200">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            placeholder="Search country..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                          />
                        </div>
                      </div>
                      <div className="py-1">
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map((country) => (
                            <div
                              key={country.name}
                              className={`px-4 py-2 cursor-pointer hover:bg-blue-50 flex items-center ${
                                values.country === country.name
                                  ? "bg-blue-100"
                                  : ""
                              }`}
                              onClick={() => {
                                setFieldValue("country", country.name);
                                setShowCountryDropdown(false);
                                setSearchTerm("");
                              }}
                            >
                              <span className="ml-2">{country.name}</span>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-gray-500 text-center">
                            No countries found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {errors.country && touched.country && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.country}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">
                  Employment Status
                </p>
                <div
                  className={`relative rounded-md shadow-sm ${
                    errors.employmentStatus && touched.employmentStatus
                      ? "border-red-500"
                      : ""
                  }`}
                >
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BriefcaseBusiness className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="employmentStatus"
                      name="employmentStatus"
                      className={`block w-full pl-10 pr-10 py-3 border ${
                        errors.employmentStatus && touched.employmentStatus
                          ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      } rounded-md cursor-pointer text-left appearance-none`}
                      value={values.employmentStatus}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Select your status</option>
                      <option value="Student">Student</option>
                      <option value="Unemployed">Unemployed</option>
                      <option value="Employed">Employed</option>
                      <option value="Self-employed">Self-employed</option>
                      <option value="Retired">Retired</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                {errors.employmentStatus && touched.employmentStatus && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.employmentStatus}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              Current Work Status
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="block text-sm font-medium text-gray-700">
                  Field of Work (if employed)
                </p>
                <div
                  className={`relative rounded-md shadow-sm ${
                    errors.fieldOfWork && touched.fieldOfWork
                      ? "border-red-500"
                      : ""
                  }`}
                >
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BriefcaseBusiness className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="fieldOfWork"
                      name="fieldOfWork"
                      type="text"
                      placeholder="e.g. Education, Healthcare, IT"
                      className={`block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md  ${
                        errors.fieldOfWork && touched.fieldOfWork
                          ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      value={values.fieldOfWork}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                {errors.fieldOfWork && touched.fieldOfWork && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.fieldOfWork}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <p className="block text-sm font-medium text-gray-700">
                  Organization (if employed)
                </p>
                <div
                  className={`relative rounded-md shadow-sm ${
                    errors.organization && touched.organization
                      ? "border-red-500"
                      : ""
                  }`}
                >
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="organization"
                      name="organization"
                      type="text"
                      placeholder="Organization name"
                      className={`block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md  ${
                        errors.organization && touched.organization
                          ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      value={values.organization}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                {errors.organization && touched.organization && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.organization}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              Areas of Interest
            </h2>
            <div
              className={`relative rounded-md shadow-sm ${
                errors.interests && touched.interests ? "border-red-500" : ""
              }`}
            >
              <p className="text-gray-600 mb-6">
                Where would you like to be involved? (Select all that apply)
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Charity",
                  "Fund Raising Events",
                  "Public Relations",
                  "IT",
                  "Health Quality Improvement",
                  "Education",
                  "Research",
                  "Finance",
                  "Consultation",
                ].map((interest) => (
                  <div
                    key={interest}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      values.interests.includes(interest)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    } ${
                      errors.interests && touched.interests
                        ? "border-red-300"
                        : ""
                    }`}
                    onClick={() => handleInterestChange(interest)}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={values.interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label className="ml-3 block text-gray-700 font-medium">
                        {interest}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              {errors.interests && touched.interests && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.interests}
                </p>
              )}
            </div>
          </div>

          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              Review & Submit
            </h2>
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Rights & Responsibilities
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-3 flex items-center">
                    <Info className="w-5 h-5 mr-2" /> Rights
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "All regular members have equal rights.",
                      "Membership is an individual right that cannot be passed on.",
                      "Right to vote and be voted for.",
                      "Right to inquire and obtain information on activities.",
                      "Right to opine on HELP Ethiopia's activities.",
                      "Right to be informed upon termination.",
                      "Right to contribute to HELP Ethiopia's objectives.",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start text-gray-700">
                        <Check className="text-blue-500 flex-shrink-0 mt-1 mr-2 w-4 h-4" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-3 flex items-center">
                    <Info className="w-5 h-5 mr-2" /> Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "All regular members should pay fees timely.",
                      "Associate members may voluntarily pay fees.",
                      "All members shall abide by the bylaws.",
                      "All members shall respect HELP Ethiopia's vision.",
                      "All members should attend meetings.",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start text-gray-700">
                        <Check className="text-blue-500 flex-shrink-0 mt-1 mr-2 w-4 h-4" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 mb-3">
                  I have read and agree to the rights and responsibilities of
                  members.
                </p>
                <div className="flex items-center space-x-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="agreement"
                      value="yes"
                      checked={values.agreement === "yes"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">Yes, I agree</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="agreement"
                      value="no"
                      checked={values.agreement === "no"}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">
                      No, I don&apos;t agree
                    </span>
                  </label>
                </div>
                {errors.agreement && touched.agreement && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.agreement}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Registration Type
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label
                  className={`p-4 border rounded-lg cursor-pointer ${
                    values.registrationType === "regular"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="registrationType"
                      value="regular"
                      checked={values.registrationType === "regular"}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <span className="block text-gray-900 font-medium">
                        Regular member
                      </span>
                      <span className="block text-gray-600 text-sm mt-1">
                        Full membership with voting rights and responsibilities
                      </span>
                    </div>
                  </div>
                </label>
                <label
                  className={`p-4 border rounded-lg cursor-pointer ${
                    values.registrationType === "associate"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="registrationType"
                      value="associate"
                      checked={values.registrationType === "associate"}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <span className="block text-gray-900 font-medium">
                        Associate member
                      </span>
                      <span className="block text-gray-600 text-sm mt-1">
                        Limited participation without voting rights
                      </span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="mb-8 text-center">
              <p className="text-gray-600 mb-2">Prefer to use Google Forms?</p>
              <button
                type="button"
                onClick={openGoogleForm}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
              >
                Register using Google Form
                <ArrowRight className="ml-1 w-5 h-5" />
              </button>
            </div>
            <div className="text-center flex justify-center">
              <p className="text-sm text-red-600 flex items-center">
                {message}
              </p>
            </div>

            <div className="mt-8 flex justify-between">
              <Link to="/">
                <button
                  type="button"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                  isSubmitting
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg cursor-pointer"
                }`}
              >
                {isSubmitting ? (
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
                    Submitting...
                  </span>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
