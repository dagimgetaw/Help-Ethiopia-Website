import member from "../../assets/member.webp";
// import abyssinia from "../../assets/abyssinia.webp";
import { Mail, Landmark, User } from "lucide-react";
import { useFormik } from "formik";
import { donateSchema } from "../../Schemas/schemas";

export default function Home() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      amount: "",
    },
    validationSchema: donateSchema,
  });

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
  } = formik;

  return (
    <div className="pt-40 pb-10 px-6 md:px-12 lg:px-20 bg-gray-100">
      <h2 className="text-4xl md:text-5xl font-semibold text-gray-800 text-center mb-10">
        Make a Donation
      </h2>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex justify-center lg:w-1/2">
          <img
            src={member}
            alt="Members of Help Ethiopia"
            className="w-full max-w-lg rounded-lg shadow-lg"
          />
        </div>
        <div className="lg:w-1/2">
          <p className="text-lg leading-relaxed">
            HELP Ethiopia is run by volunteers and contributions from generous
            donors. Your donation will cover medical treatments, laboratory
            investigations, imaging, and surgical supplies for patients in need.
          </p>
          <p className="mt-4 text-lg font-semibold">
            Every donation makes a difference!
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="my-10 p-6 bg-white shadow-lg rounded-xl max-w-lg mx-auto">
          <div className="space-y-5">
            <div className="flex flex-col">
              <div
                className={`flex items-center gap-3 border border-gray-300 bg-white p-3 rounded-lg shadow-md ${
                  errors.firstName && touched.firstName
                    ? "ring-2 ring-red-500"
                    : "hover:ring-2 hover:ring-blue-500"
                }`}
              >
                <User className="text-gray-500" />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full outline-none text-gray-700 placeholder-gray-400"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.firstName && touched.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div className="flex flex-col">
              <div
                className={`flex items-center gap-3 border border-gray-300 bg-white p-3 rounded-lg shadow-md ${
                  errors.lastName && touched.lastName
                    ? "ring-2 ring-red-500"
                    : "hover:ring-2 hover:ring-blue-500"
                }`}
              >
                <User className="text-gray-500" />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full outline-none text-gray-700 placeholder-gray-400"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.lastName && touched.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>

            <div className="flex flex-col">
              <div
                className={`flex items-center gap-3 border border-gray-300 bg-white p-3 rounded-lg shadow-md ${
                  errors.email && touched.email
                    ? "ring-2 ring-red-500"
                    : "hover:ring-2 hover:ring-blue-500"
                }`}
              >
                <Mail className="text-gray-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full outline-none text-gray-700 placeholder-gray-400"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="relative flex flex-col">
              <div
                className={`flex items-center gap-3 border border-gray-300 bg-white p-3 rounded-lg shadow-md ${
                  errors.amount && touched.amount
                    ? "ring-2 ring-red-500"
                    : "hover:ring-2 hover:ring-blue-500"
                }`}
              >
                <Landmark className="text-gray-500" />
                <input
                  type="text"
                  name="amount"
                  placeholder="Enter amount"
                  className="w-full outline-none text-gray-700 placeholder-gray-400"
                  value={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className="absolute right-4 text-gray-500 font-medium">
                  Birr
                </span>
              </div>
              {errors.amount && touched.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
            </div>
          </div>

          <button
            className={`w-full py-3 mt-6 rounded-lg bg-[#1E3A8A] text-white ${
              isSubmitting ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
            disabled={isSubmitting}
            type="submit"
          >
            Donate
          </button>
        </div>
      </form>

      {/* 
      <div className="mt-16 bg-white shadow-lg rounded-xl p-6 text-center max-w-lg mx-auto">
        <img
          src={abyssinia}
          alt="Abyssinia Bank Logo"
          className="w-60 mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold text-gray-800">
          Bank Of Abyssinia
        </h2>
        <p className="text-gray-600 mt-2">
          Branch: <span className="font-medium">Filwuha Branch</span>
        </p>
        <p className="text-gray-600">
          Account Name: <span className="font-medium">YeEteye Charity</span>
        </p>
        <p className="text-gray-600">
          Account Number:{" "}
          <span className="font-medium text-blue-700 text-lg">83291621</span>
        </p>
      </div> 
      */}
    </div>
  );
}
