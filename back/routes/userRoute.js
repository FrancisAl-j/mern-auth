import express from "express";
import controller from "../controller/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", controller.UserController);

// Updating user profile
router.put("/update/:id", verifyToken, controller.updateController);

// Deleting a user
router.delete("/delete/:id", verifyToken, controller.deleteController);

export default router;
