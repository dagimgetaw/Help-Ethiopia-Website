const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const userEmail = await userModel.findOne({ email });
    if (userEmail) {
      return res.status(400).json({
        status: "error",
        message: "User with this email already registered",
      });
    }

    // Hash the password and create the user
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hash,
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "No user exists with this email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: "error", message: "Incorrect password" });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET || "jwt-secret-key",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({
      status: "ok",
      role: user.role,
      message: "User logged in successfully",
      firstName: user.firstName,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "No token provided" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || "jwt-secret-key",
    (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ status: "error", message: "Invalid token" });
      }

      req.user = decoded;
      next();
    }
  );
};

const dashboard = (req, res) => {
  res.json({
    status: "ok",
    message: "Welcome to the dashboard",
    user: req.user,
  });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find(); // Change User to userModel
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

module.exports = { signup, login, verifyUser, dashboard, getAllUsers };
