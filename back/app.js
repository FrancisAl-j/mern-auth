import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
//files
import connectDB from "./config.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
  connectDB();
});

// API routes
app.use("/user", userRoute);

// Creating an account with authentication
app.use("/auth", authRoute);

// Creating a middleware to handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
