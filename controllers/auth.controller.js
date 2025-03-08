const usersSchema = require("../schemas/users.schema.js");
const bcrypt = require('bcrypt');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const emailService = require('../service/email.service.js');
const generateOtp = require('../helpers/helpers.js');

const authController = {};
require("dotenv").config();

authController.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!password) {
      return res.status(400).json({ status: 400, message: "Password is required" });
    }

    const isEmailExists = await usersSchema.findOne({ email: email });
    if (isEmailExists) {
      return res.status(401).json({ status: 401, message: "Email already exists" });
    }

    const token = await jwt.sign({ email: email }, config.secret);

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOtp();

    let user = new usersSchema({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      accessToken: token,
      otp: otp,
    });

    await user.save();

    await emailService.sendMail(
      user.email,
      'E-Commerce Verification',
      `Your OTP for E-Commerce Verification is: ${otp}`
    );

    user.password = undefined;

    return res.status(201).json({ status: 201, message: "User registered successfully", user });
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
};


authController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const getEmailByUser = await usersSchema.findOne({
      email: email
    });
    if (!getEmailByUser) {
      return res.status(404).json({ status: 401, message: "User not found" });
    }
    const isPassWordValid = await bcrypt.compare(password, getEmailByUser.password);
    if (!isPassWordValid) {
      return res.status(404).json({ status: 401, message: "Invalid Password" });
    }
    if (!getEmailByUser.otpVerified) {
      const otp = generateOtp();
      user.otp = otp;
      await user.save();
      await emailService.sendMail(
        getUser.email,
        'SNIPER Verification',
        `Your OTP for Sniper Verification is: ${otp}`,
      );
    }
    return res.status(200).json({ status: 200, message: "Login Successfull", user: getEmailByUser });

  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
};

authController.verifyOtp = async (req, res) => {
  try {
    let body = req.body;
    let user = await usersSchema.findOne({ email: body.email, otp: parseInt(body.otp, 10) });

    if (user !== null) {
      await usersSchema.updateOne({ email: body.email }, { $set: { otpVerified: true } });

      const accessToken = jwt.sign(
        { user_id: user._id, email: user.email },
        config.secret,
      );
      await usersSchema.updateOne({ email: body.email }, { $set: { accessToken: accessToken } });
      const updatedUser = await usersSchema.findOne({ email: body.email });

      return res.status(200).json({
        status: 200,
        message: "OTP Verified Successfully",
        user: { ...updatedUser, accessToken: accessToken },
      });
    } else {
      return res.status(400).json({ status: 400, message: "Invalid OTP" });
    }
  } catch (error) {
    console.error('Error verifying otp:', error);
    return res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

authController.resetPassword = async (req, res) => {
  try {
    let body = req.body;
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const resetPassword = await usersSchema.updateOne(
      { email: body.email },
      { $set: { password: hashedPassword } }
    );
    
    if (!resetPassword || resetPassword.modifiedCount === 0) {
      return res.status(400).json({ message: "Failed to reset password" });
    }
    
    if (resetPassword) {
      return res.status(200).json({
        status: 200,
        message: "Password Updated Successfully",
      });
    }
    else {
      return res.status(400).json({ status: 400, message: "Error in updating password" });
    }
  } catch (error) {
    console.error('Error verifying otp:', error);
    return res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

authController.sendOtp = async (req, res) => {
  try {
    let body = req.body;
    const user = await usersSchema.findOne({ email: body.email });
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    const otp = generateOtp();
    user.otp = otp;
    await user.save();
    await emailService.sendMail(
      user.email,
      'SNIPER Verification',
      `Your OTP for Sniper Verification is: ${otp}`,
    );
    return res.status(200).json({ status: 200, message: "Otp send Otp" });
  } catch (error) {
    console.error('Error in sending otp', error);
    throw new Error(error);
  }
}

module.exports = authController;