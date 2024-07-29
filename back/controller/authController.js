import User from "../models/userModel.js";
import bcryptjs from "bcryptjs"; // For encrypting the password inside database for security
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// Authentication for signup
const signup = async (req, res, next) => {
  // First is insert next
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10); // And this is how to use it
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User successfully sent" });
  } catch (error) {
    next(error);
  }
};

//Authentication for signin
const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return res.status(404).json({ message: "User not found" });

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: hashedPassword, ...rest } = validUser._doc;

    const expiryDate = new Date(Date.now() + 3600000); // Expiration of cookie is 1 hour
    res
      .cookie("token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export default { signup, signin };
