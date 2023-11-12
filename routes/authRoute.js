import express from "express";
import AuthController from "../controller/authController.js";
const router = express.Router();

router.post("/register", AuthController.register);
router.post("/send-verification-email", AuthController.sendVerificationEmail);
router.post("/verify-otp", AuthController.verifyOTP);
router.post("/login", AuthController.login);

export default router;
