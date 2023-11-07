import UserService from '../services/userService.js';

class AuthController {
  // Method for handling user registration
  async register(req, res) {
    try {
      const { uid, name, email, password } = req.body;
      const existingUser = await UserService.checkUser(email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
      const user = await UserService.createUser(uid, name, email, password);
      res.status(201).json({ user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Method for handling user login
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserService.loginUser(email, password);
      res.status(200).json({ user });
    } catch (error) {
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
