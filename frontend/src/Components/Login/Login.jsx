import { Link } from "react-router-dom";
import { Mail, LockKeyhole, Eye, EyeClosed } from "lucide-react";
import google from "../../assets/google.png";
import { useState } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../../Schemas/schemas";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [hide, setHide] = useState(true);

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, actions) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await axios.post("http://localhost:3000/login", values);
        console.log("Submitted values:", values);
        console.log("User logedin successfully");
        actions.resetForm();
        navigate("/");
      } catch (error) {
        console.error("Login error:", error);
      }
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

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="pt-20 pb-10 min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-text">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800">
          Login
        </h2>
        <div className="max-w-md w-full space-y-9">
          <div className="mt-8 space-y-6">
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
              {errors.password && touched.password && (
                <p className="font-text pl-2 pt-2 text-red-500">
                  {errors.password}
                </p>
              )}
            </div>
            <button
              className={`w-full py-3 mt-6 rounded-lg bg-[#1E3A8A] text-white ${
                isSubmitting
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              type="submit"
              disabled={isSubmitting}
              onClick={() => {
                console.log("+");
              }}
            >
              {isSubmitting ? "Login..." : "Login"}
            </button>
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
                Login in with Google
              </span>
            </button>
          </div>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link to={"/signup"}>
              <span className="text-[#1E3A8A] font-semibold hover:underline cursor-pointer">
                Create account
              </span>
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
