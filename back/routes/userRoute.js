import express from "express";
import controller from "../controller/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", controller.UserController);

// Updating user profile
router.put("/update/:id", verifyToken, controller.updateController);

export default router;
