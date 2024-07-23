import express from "express";
import signup from "../controller/authController.js"; // Always add .js on all files

const router = express.Router();

router.post('/signup', signup)

export default router