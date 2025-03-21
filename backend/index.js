require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");
const userRoute = require("./routes/userRoutes");

const port = process.env.PORT || 5000;

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

app.use("/", userRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
