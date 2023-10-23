import express from "express";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

import AuthModel from "../models/authModel.js";
import OtpModel from "../models/otpModel.js";
import {
  hashPassword,
  generateOTP,
  comparePassword,
} from "../helpers/authHelper.js";

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  auth: {
    user: "004ujala@gmail.com",
    pass: "",
  },
});

router.post("/authRegister", async (req, res) => {
  try {
    const { uid, name, primary_email, secondary_email, p_number, password } =
      req.body;
    if (!uid) {
      return res.send({ message: "UID is Required" });
    }
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!primary_email) {
      return res.send({ message: "Primary Email is Required" });
    }
    if (!secondary_email) {
      return res.send({ message: "Secondary Email is Required" });
    }
    if (!p_number) {
      return res.send({ message: "Phone Number is Required" });
    }

    let existUser = await AuthModel.findOne({ primary_email });
    if (existUser) {
      return res.status(200).send({
        success: false,
        message: "user already exist",
      });
    }
    const hashedPassword = await hashPassword(password);
    const otp = await generateOTP();
    const textt = `your otp is ${otp}`;
    const mailOptions = {
      from: "004ujala@gmail.com", // Sender's email address
      to: primary_email, // Recipient's email address
      subject: "OTP from server side", // Subject of the email
      text: textt, // Email body
    };

    var info = await transporter.sendMail(mailOptions);
    const user = new OtpModel({
      uid,
      name,
      primary_email,
      secondary_email,
      p_number,
      password: hashedPassword,
      otp: otp,
    });
    await user.save();
    res.status(201).send({
      success: true,
      message: "data saved successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "some internal error occurred",
    });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { primary_email, otp } = req.body;
    const otpUser = await OtpModel.findOne({
      primary_email: primary_email,
      otp: otp,
    });
    let user = await new AuthModel({
      uid: otpUser.uid,
      name: otpUser.name,
      primary_email: otpUser.primary_email,
      secondary_email: otpUser.secondary_email,
      p_number: otpUser.p_number,
      password: otpUser.password,
    }).save();

    let deletedUser = await OtpModel.deleteOne({ primary_email, otp });

    res.status(201).send({
      success: true,
      message: "user registred successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "some internal error occurred",
      error,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { primary_email, password } = req.body;
    const userr = await AuthModel.findOne({ primary_email: primary_email });

    const val = comparePassword(password, userr.password);
    if (val) {
      const payload = {
        primary_email: primary_email,
      };

      var token = await jwt.sign(payload, process.env.SECRET_KEY);
      const options = {
        expires: new Date(
          Date.now() + process.env.EXPIREC * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };
      res.status(201).cookie("token", token, options).json({
        success: true,
        message: "login successfully",
        token,
      });
      // return res.status(200).send({ success: true, message: "login successfully", token });
    } else {
      return res.status(401).send({
        success: false,
        message: "invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "some internal error occurred",
    });
  }
});

export default router;
