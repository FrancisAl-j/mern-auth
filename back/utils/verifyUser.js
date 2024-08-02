// Middleware for checking the cookies of a user
import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    console.log("No token found in cookies"); // Debugging line
    return next(errorHandler(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(401, "Token is not valid"));

    console.log("Decoded user:", user); // Debugging line
    req.user = user;
    next();
  });
};
