import * as yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const nameRules = /^[A-Za-z]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const ethiopianPhoneRegex = /^\d{8}$/;
const fullNameRules = /^[A-Za-z]+(?:\s[A-Za-z]+)+$/;

export const signupSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .matches(nameRules, "Only letters are allowed")
    .required("First name is required"),
  lastName: yup
    .string()
    .trim()
    .matches(nameRules, "Only letters are allowed")
    .required("Last name is required"),
  email: yup
    .string()
    .matches(
      emailRegex,
      "Please enter a valid email address (e.g., example@domain.com)"
    )
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
    .matches(
      emailRegex,
      "Please enter a valid email address (e.g., example@domain.com)"
    )
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const donateSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .matches(nameRules, "Only letters are allowed")
    .required("First name is required"),
  lastName: yup
    .string()
    .trim()
    .matches(nameRules, "Only letters are allowed")
    .required("Last name is required"),
  email: yup
    .string()
    .matches(
      emailRegex,
      "Please enter a valid email address (e.g., example@domain.com)"
    )
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(
      ethiopianPhoneRegex,
      "Please enter an 8-digit Ethiopian phone number (without the country code)."
    )
    .required("Phone number is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than zero")
    .integer("Amount must be a whole number")
    .min(10, "Amount must be at least 10 Birr")
    .max(100000, "Amount cannot exceed 100,000 Birr")
    .required("Amount is required"),
  currency: yup
    .string()
    .required("Currency is required")
    .oneOf(
      ["EUR", "USD", "GBP", "JYP"],
      "Please select a valid currency option"
    ),
});

export const subscribeSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .matches(
      emailRegex,
      "Please enter a valid email address (e.g., example@domain.com)"
    )
    .required("Email is required"),
});

export const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .matches(nameRules, "Only letters are allowed")
    .required("First name is required"),
  lastName: yup
    .string()
    .trim()
    .matches(nameRules, "Only letters are allowed")
    .required("Last name is required"),
  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(["female", "male"], "Please select a valid gender option"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .matches(
      emailRegex,
      "Please enter a valid email address (e.g., example@domain.com)"
    )
    .required("Email is required"),
  birthYear: yup
    .number()
    .typeError("Birth year must be a number")
    .integer("Birth year must be a whole number")
    .min(1950, "Birth year must be 1950 or later")
    .max(2015, "Birth year must be 2015 or earlier")
    .required("Birth year is required"),
  phoneNumber: yup
    .string()
    .matches(
      ethiopianPhoneRegex,
      "Please enter an 8-digit Ethiopian phone number (without the country code)."
    )
    .required("Phone number is required"),
  country: yup
    .string()
    .required("Region is required")
    .oneOf(
      [
        "Addis Ababa",
        "Afar",
        "Amhara",
        "Benishangul-Gumuz",
        "Dire Dawa",
        "Gambela",
        "Harari",
        "Oromia",
        "Sidama",
        "Somali",
        "South West Ethiopia",
        "Southern Nations, Nationalities, and Peoples' Region (SNNPR)",
        "Tigray",
      ],
      "Please select a valid region option"
    ),
  employmentStatus: yup
    .string()
    .required("Employment status is required")
    .oneOf(
      ["Student", "Unemployed", "Employed", "Self-employed", "Retired"],
      "Please select a valid employment status option"
    ),
  fieldOfWork: yup
    .string()
    .trim()
    .when("employmentStatus", {
      is: (status) => status === "Employed" || status === "Self-employed", // Correct condition
      then: (schema) =>
        schema
          .required("Field of work is required")
          .min(2, "Field of work must be at least 2 characters")
          .max(50, "Field of work must be less than 50 characters")
          .matches(
            /^[a-zA-Z\s\-&,]+$/,
            "Only letters, spaces, and basic punctuation are allowed"
          ),
      otherwise: (schema) => schema.notRequired(),
    }),
  organization: yup
    .string()
    .trim()
    .when("employmentStatus", {
      is: (status) => status === "Employed" || status === "Self-employed", // Correct condition
      then: (schema) =>
        schema
          .required("Organization is required")
          .min(2, "Organization must be at least 2 characters")
          .max(50, "Organization must be less than 50 characters")
          .matches(
            /^[a-zA-Z\s\-&,]+$/,
            "Only letters, spaces, and basic punctuation are allowed"
          ),
      otherwise: (schema) => schema.notRequired(),
    }),
  interests: yup
    .array()
    .min(1, "Please select at least one area of interest")
    .required("At least one interest is required"),
  agreement: yup
    .string()
    .required("You must agree to the terms to continue")
    .oneOf(["yes"], "You must agree to proceed"),
});

export const contactSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .matches(fullNameRules, "Please enter your full name (e.g., Abebe Kebede)")
    .required("Full name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .matches(
      emailRegex,
      "Please enter a valid email address (e.g., example@domain.com)"
    )
    .required("Email is required"),
  message: yup
    .string()
    .trim()
    .required("Message is required")
    .min(2, "Message must be at least 2 characters")
    .max(200, "Message must be less than 200 characters")
    .matches(
      /^[a-zA-Z\s\-&,'".?]+$/,
      "Only letters, spaces, and basic punctuation are allowed"
    ),
});
