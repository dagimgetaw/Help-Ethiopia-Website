const registerModel = require("../models/registerModel");

const saveRegistrationData = async (req, res) => {
  try {
    const {
      firstName = "",
      lastName = "",
      gender = "",
      email = "",
      birthYear = null,
      phoneNumber = "",
      country = "",
      employmentStatus = "",
      fieldOfWork = "",
      organization = "",
      interests = [],
      agreement = false,
      registrationType = "",
    } = req.body;

    if (!email || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const existingUser = await registerModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const newData = new registerModel({
      firstName,
      lastName,
      gender,
      email: email.toLowerCase(),
      birthYear,
      phoneNumber,
      region: country,
      employmentStatus,
      fieldOfWork,
      organization,
      interests: Array.isArray(interests) ? interests : [interests],
      agreement,
      registrationType,
    });

    await newData.save();

    return res.status(201).json({
      success: true,
      message: "Registration successful!",
      data: {
        id: newData._id,
        email: newData.email,
        registeredAt: newData.createdAt,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  saveRegistrationData,
};
