import express from "express";
import controller from "../controller/authController.js"; // Always add .js on all files

const router = express.Router();

router.post('/signup', controller.signup);

router.post('/signin', controller.signin)

export default router