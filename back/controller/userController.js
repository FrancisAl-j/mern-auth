import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

const UserController = (req, res) => {
  res.json({
    message: "Hello",
  });
};

const updateController = async (req, res, next) => {
  const { id } = req.params;
  //const { username, email, password, profilePicture } = req.body;
  if (req.user.id !== id) {
    return next(errorHandler(401, "You can update only  account"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(password, 10);
    }

    const updatedUser = User.findByIdAndUpdate(
      id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },

      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export default { UserController, updateController };
