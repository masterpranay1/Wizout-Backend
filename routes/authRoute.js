const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const authModel = require("../models/authModel");
const otpModel = require("../models/otpModel");
const { hashPassword, generateOTP, comparePassword, } = require("../helpers/authHelper");
const jwt = require('jsonwebtoken');
router.use(cookieParser());



router.get("/hi", (req, res) => {
    res.send("hello from server side");
})
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    auth: {
        user: '004ujala@gmail.com',
        pass: '',
    },
});
router.post("/authRegister", async (req, res) => {
    try {
        const { uid, name, primary_email, secondary_email, p_number, password } = req.body;
        if (!uid) {
            return res.send({ message: "UID is Required" })
        }
        if (!name) {
            return res.send({ message: "Name is Required" })
        }
        if (!primary_email) {
            return res.send({ message: "Primary Email is Required" })
        }
        if (!secondary_email) {
            return res.send({ message: "Secondary Email is Required" })
        }
        if (!p_number) {
            return res.send({ message: "Phone Number is Required" })
        }

        let existUser = await authModel.findOne({ primary_email });
        if (existUser) {
            return res.status(200).send({
                success: false,
                message: "user already exist"
            })
        }
        const hashedPassword = await hashPassword(password);
        const otp = await generateOTP();
        const textt = `your otp is ${otp}`;
        const mailOptions = {
            from: '004ujala@gmail.com', // Sender's email address
            to: primary_email, // Recipient's email address
            subject: 'OTP from server side', // Subject of the email
            text: textt, // Email body
        };

        var info = await transporter.sendMail(mailOptions);
        const user = new otpModel({ uid, name, primary_email, secondary_email, p_number, password: hashedPassword, otp: otp });
        await user.save();
        res.status(201).send({
            success: true,
            message: "data saved successfully"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "some internal error occurred"
        })
    }
})


router.post("/verify-otp", async (req, res) => {
    try {
        const { primary_email, otp } = req.body;
        const otpUser = await otpModel.findOne({ primary_email: primary_email, otp: otp });
        let user = await new authModel({ uid: otpUser.uid, name: otpUser.name, primary_email: otpUser.primary_email, secondary_email: otpUser.secondary_email, p_number: otpUser.p_number, password: otpUser.password }).save();

        let deletedUser = await otpModel.deleteOne({ primary_email, otp });

        res.status(201).send({
            success: true,
            message: "user registred successfully",
        })


    } catch (error) {
        res.status(500).send({
            success: false,
            message: "some internal error occurred",
            error
        })
    }

})

router.post("/login", async (req, res) => {
    try {
        const { primary_email, password } = req.body;
        const userr = await authModel.findOne({ primary_email: primary_email });
        const val = comparePassword(password, userr.password);
        if (val) {
            var token = await jwt.sign({ primary_email }, process.env.SECRET_KEY)

            return res.status(200).send({ success: true, message: "login successfully", token });
        } else {
            return res.status(401).send({
                success: false,
                message: "invalid credentials",
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "some internal error occurred",
        })
    }
})


module.exports = router;
