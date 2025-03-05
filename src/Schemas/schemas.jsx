import * as yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const nameRules = /^[A-Za-z]+$/;

export const signupSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(nameRules, "Only letters are allowed")
    .required("First name is required"),
  lastName: yup
    .string()
    .matches(nameRules, "Only letters are allowed")
    .required("Last name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(passwordRules, { message: "Please create a strong password" })
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
