import express from "express";
import controller from "../controller/authController.js"; // Always add .js on all files

const router = express.Router();

// Sign up
router.post("/signup", controller.signup);

// Signin
router.post("/signin", controller.signin);

// For google acounts
router.post("/google", controller.google);

// Sign out
router.get("/signout", controller.signout);

export default router;
