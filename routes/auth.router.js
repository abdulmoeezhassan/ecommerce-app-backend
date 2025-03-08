const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router.post(
  "/register",
  authController.register);

router.post(
  "/login",
  authController.login);

router.post(
  "/verify-otp",
  authController.verifyOtp);

router.post(
  "/reset-password",
  authController.resetPassword);

router.post(
  "/send-otp",
  authController.sendOtp);

module.exports = router;