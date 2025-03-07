require("dotenv").config();
const express = require("express");
const port = process.env.PORT;
const connectDB = require("./db");
const userModel = require("./models/userModel");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
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
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            { email: user.email, role: user.role },
            "jwt-secret-key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          res.status(200).json({
            status: "ok",
            role: user.role,
            message: "User logged in successfully",
          });
        } else {
          res
            .status(400)
            .json({ status: "error", message: "Incorrect password" });
        }
      });
    } else {
      res
        .status(404)
        .json({ status: "error", message: "No user exists with this email" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "No token provided" });
  }

  jwt.verify(token, "jwt-secret-key", (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid token" });
    }

    req.user = decoded;

    if (decoded.role === "admin") {
      next();
    } else {
      return res
        .status(403)
        .json({ status: "error", message: "Not authorized" });
    }
  });
};

app.get("/dashboard", verifyUser, (req, res) => {
  res.json({
    status: "ok",
    message: "Welcome to the dashboard",
    user: req.user,
  });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
