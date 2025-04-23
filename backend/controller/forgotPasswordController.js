const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body.values || req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(500).json({
        status: "error",
        message: "No account found for this email",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Password Reset Request</h2>
          <p>We received a request to reset your password. Click the button below to proceed:</p>
          <a href="${resetLink}" 
             style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 5px; margin: 15px 0;">
            Reset Password
          </a>
          <p>This link will expire in 15 minutes for security reasons.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="font-size: 12px; color: #6b7280;">For security reasons, we don't store your password. This link gives you access to reset it.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      status: "success",
      message: "A reset link has been sent",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

const ResetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!token || !password) {
    return res.status(400).json({
      status: "error",
      message: "Token and password are required",
    });
  }

  try {
    const cleanToken = token.trim();
    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
    const hash = await bcrypt.hash(password, 10);
    const updatedUser = await userModel.findByIdAndUpdate(
      decoded.id,
      { password: hash },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.json({
      status: "success",
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Password reset error:", error);

    let statusCode = 500;
    let message = "An error occurred during password reset";

    if (error.name === "TokenExpiredError") {
      statusCode = 401;
      message = "Password reset link has expired";
    } else if (error.name === "JsonWebTokenError") {
      statusCode = 400;
      message = "Invalid password reset token";
    }

    return res.status(statusCode).json({
      status: "error",
      message,
    });
  }
};

module.exports = { forgotPassword, ResetPassword };
