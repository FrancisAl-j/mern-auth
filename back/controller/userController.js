import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

const UserController = (req, res) => {
  res.json({
    message: "Hello",
  });
};

// Updating profile
const updateController = async (req, res, next) => {
  const { id } = req.params;
  const { username, email, password, profilePicture } = req.body;

  // Check if the user is trying to update their own account
  if (req.user.id !== id) {
    return next(errorHandler(401, "You can update only your own account"));
  }

  try {
    // Hash the password if provided
    const updatedData = {
      username,
      email,
      profilePicture,
    };

    if (password) {
      updatedData.password = bcryptjs.hashSync(password, 10);
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    // Omit the password from the response
    const { password: _, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Deleting user
const deleteController = async (req, res, next) => {
  const { id } = req.params;
  if (req.user.id !== id) {
    return next(errorHandler(401, "You can delete only your account!"));
  }
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json("Account successfully deleted.");
  } catch (error) {
    next(error);
  }
};

export default { UserController, updateController, deleteController };
