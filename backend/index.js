require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");
const Routes = require("./routes/Routes");

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.static("public"));

connectDB();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/", Routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
