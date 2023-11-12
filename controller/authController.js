import emailService from "../services/emailService.js";
import otpService from "../services/otpService.js";
import UserService from "../services/userService.js";

class AuthController {
  // Method for handling user registration
  async register(req, res) {
    try {
      const { uid, name, email, password } = req.body;
      const existingUser = await UserService.checkUser(email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Check if user is registered but not verified
      const unverifiedUser = await UserService.checkUnverifiedUser(email);
      if (unverifiedUser) {
        return res
          .status(400)
          .json({ error: "User already exists but not verified" });
      }

      const user = await UserService.createUser(uid, name, email, password);
      res.status(201).json({
        message: "User created successfully but not verified",
        user,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async sendVerificationEmail(req, res) {
    const { email } = req.body;
    console.log(email);
    const user = await UserService.checkUser(email);
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // Check if user is already verified
    if (user.isVerified) {
      return res.status(400).json({ error: "User is already verified" });
    }

    // send opt to user email
    const otp = await otpService.generateOTP();
    const subject = "Email verification";
    const text = `Your OTP is ${otp}`;

    try {
      await UserService.saveOtp(email, otp);
    } catch (error) {
      res.status(400).json({ error: "Internal Error" });
    }

    try {
      await emailService.sendEmail(email, subject, text);
      res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async verifyOTP(req, res) {
    const { email, otp } = req.body;
    const user = await UserService.checkUser(email);
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // Check if user is already verified
    if (user.isVerified) {
      return res.status(400).json({ error: "User is already verified" });
    }

    // Verify OTP
    const isVerified = await otpService.verifyOTP(user.otp, otp);
    if (!isVerified) {
      return res.status(400).json({ error: "OTP is invalid" });
    }

    // Update user
    try {
      await UserService.updateUser(email, { isVerified: true });
      res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Method for handling user login
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const isUserExist = await UserService.checkUser(email);

      if(!isUserExist) {
        return res.status(400).json({ error: "User does not exist" });
      }

      // Check if user is already verified
      if (!isUserExist.isVerified) {
        return res.status(400).json({ error: "User is not verified" });
      }

      res.status(200).json({ user: isUserExist });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }

  // Method for handling user logout
  async logout(req, res) {
    // Implementation goes here
  }

  // Method for handling password reset request
  async forgotPassword(req, res) {
    // Implementation goes here
  }

  // Method for handling password reset confirmation
  async resetPassword(req, res) {
    // Implementation goes here
  }
}

export default new AuthController();
