import User from '../models/userModel.js';

class UserService {
  // Create a new user
  async createUser(uid, name, email, password) {
    try {
      const user = new User({ uid, name, email, password });
      await user.save();
      console.log('User created successfully');
      return user;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // Check if a user exists in the database
  async checkUser(email) {
    try {
      const user = await User.findOne({ email });
      if (user) {
        console.log('User exists in the database');
        return user;
      } else {
        console.log('User does not exist in the database');
        return null;
      }

    } catch (error) {
      console.error(error);
      return error;
    }
  }
}

export default new UserService();
