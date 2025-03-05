import { Link } from "react-router-dom";
import { Mail, LockKeyhole, User, Eye, EyeClosed } from "lucide-react";
import google from "../../assets/google.png";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { signupSchema } from "../../Schemas/schemas";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [hide, setHide] = useState(true);
  const [rule, setRule] = useState(false);
  const [cp, setCp] = useState(false);
  const [passwordTests, setPasswordTests] = useState({});
  const [confirmPasswordTest, setConfirmPasswordTest] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values, actions) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Submitted values:", values);
      actions.resetForm();
      navigate("/login");
    },
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

  useEffect(() => {
    const password = values.password;

    setPasswordTests({
      lengthTest: password.length >= 8,
      uppercaseTest: /[A-Z]/.test(password),
      lowercaseTest: /[a-z]/.test(password),
      numberTest: /\d/.test(password),
      specialTest: /[\W_]/.test(password),
    });
    setConfirmPasswordTest(values.password === values.confirmPassword);
  }, [values.password, values.confirmPassword]);

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="pt-40 pb-20 min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-text">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800">
          Sign Up
        </h2>
        <div className="max-w-md w-full space-y-9">
          <div className="mt-8 space-y-6">
            <div className="flex flex-col">
              <div
                className={`flex items-center gap-3 shadow-md rounded-lg border border-gray-300 bg-white p-3 
                ${
                  errors.firstName && touched.firstName
                    ? "ring ring-red-500 ring-offset-0"
                    : "hover:ring hover:ring-blue-500 hover:ring-offset-0"
                }`}
              >
                <User className="text-gray-500" />
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  className="w-full outline-none text-gray-700 placeholder-gray-400"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.firstName && touched.firstName && (
                <p className="font-text pl-2 pt-2 text-red-500">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <div
                className={`flex items-center gap-3 shadow-md rounded-lg border border-gray-300 bg-white p-3 
                ${
                  errors.lastName && touched.lastName
                    ? "ring ring-red-500 ring-offset-0"
                    : "hover:ring hover:ring-blue-500 hover:ring-offset-0"
                }`}
              >
                <User className="text-gray-500" />
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  className="w-full outline-none text-gray-700 placeholder-gray-400"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.lastName && touched.lastName && (
                <p className="font-text pl-2 pt-2 text-red-500">
                  {errors.lastName}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <div
                className={`flex items-center gap-3 shadow-md rounded-lg border border-gray-300 bg-white p-3
                   ${
                     errors.email && touched.email
                       ? "ring ring-red-500 ring-offset-0"
                       : "hover:ring hover:ring-blue-500 hover:ring-offset-0"
                   }`}
              >
                <Mail className="text-gray-500" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="w-full outline-none text-gray-700 placeholder-gray-400"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.email && touched.email && (
                <p className="font-text pl-2 pt-2 text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <div
                className={`flex items-center gap-3 shadow-md rounded-lg border border-gray-300 bg-white p-3                 
                  ${
                    errors.password && touched.password
                      ? "ring ring-red-500 ring-offset-0"
                      : "hover:ring hover:ring-blue-500 hover:ring-offset-0"
                  }`}
                onClick={() => {
                  setRule(true);
                }}
              >
                <LockKeyhole className="text-gray-500" />
                <input
                  type={hide ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="w-full outline-none text-gray-700 placeholder-gray-400"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {hide ? (
                  <EyeClosed
                    className="text-gray-500 cursor-pointer"
                    onClick={() => setHide(!hide)}
                  />
                ) : (
                  <Eye
                    className="text-gray-500 cursor-pointer"
                    onClick={() => setHide(!hide)}
                  />
                )}
              </div>
              {rule ? (
                <div className="flex flex-col font-text pl-2">
                  <p
                    className={`text-red-500 pt-2 ${
                      passwordTests.lengthTest ? "hidden" : ""
                    }`}
                  >
                    Password must be at least 8 characters
                  </p>
                  <p
                    className={`text-red-500 pt-2 ${
                      passwordTests.uppercaseTest ? "hidden" : ""
                    }`}
                  >
                    Password must contain at least one uppercase letter
                  </p>
                  <p
                    className={`text-red-500 pt-2 ${
                      passwordTests.lowercaseTest ? "hidden" : ""
                    }`}
                  >
                    Password must contain at least one lowercase letter
                  </p>
                  <p
                    className={`text-red-500 pt-2 ${
                      passwordTests.numberTest ? "hidden" : ""
                    }`}
                  >
                    Password must contain at least one number
                  </p>
                  <p
                    className={`text-red-500 pt-2 ${
                      passwordTests.specialTest ? "hidden" : ""
                    }`}
                  >
                    Password must contain at least one special character
                  </p>
                </div>
              ) : (
                ""
              )}
              {errors.password && touched.password && (
                <p className="font-text pl-2 pt-2 text-red-500">
                  {errors.password}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <div
                className={`flex items-center gap-3 shadow-md rounded-lg border border-gray-300 bg-white p-3                 
                  ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "ring ring-red-500 ring-offset-0"
                      : "hover:ring hover:ring-blue-500 hover:ring-offset-0"
                  }`}
                onClick={() => {
                  setCp(true);
                }}
              >
                <LockKeyhole className="text-gray-500" />
                <input
                  type={hide ? "password" : "text"}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full outline-none text-gray-700 placeholder-gray-400"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {hide ? (
                  <EyeClosed
                    className="text-gray-500 cursor-pointer"
                    onClick={() => setHide(!hide)}
                  />
                ) : (
                  <Eye
                    className="text-gray-500 cursor-pointer"
                    onClick={() => setHide(!hide)}
                  />
                )}
              </div>
              {cp ? (
                <p
                  className={`font-text pl-2 pt-2 text-red-500 ${
                    confirmPasswordTest ? "hidden" : ""
                  }`}
                >
                  Confirm Passwords must match to Passwords
                </p>
              ) : (
                ""
              )}
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="font-text pl-2 pt-2 text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <div className="flex items-center my-6">
              <div className="border-t border-gray-300 flex-grow"></div>
              <p className="mx-4 text-gray-500">Or</p>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>
            <div className="flex justify-center">
              <button className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition duration-300 cursor-pointer">
                <img src={google} alt="Google" className="w-6 h-6" />
                <span className="text-gray-700 font-medium">
                  Sign up with Google
                </span>
              </button>
            </div>
            <button
              className={`w-full py-3 mt-6 rounded-lg bg-[#1E3A8A] text-white ${
                isSubmitting
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              disabled={isSubmitting}
              onClick={() => {
                setRule(false), setCp(false);
              }}
              type="submit"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </div>
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link to={"/login"}>
              <span className="text-[#1E3A8A] font-semibold hover:underline cursor-pointer">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
