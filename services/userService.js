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

  // check if a user exists in the database but not verified
  async checkUnverifiedUser(email) {
    try {
      const user = await User.findOne({ email, verified: false });
      if (user) {
        console.log('Unverified user exists in the database');
        return user;
      } else {
        console.log('Unverified user does not exist in the database');
        return null;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // save otp to the database
  async saveOtp(email, otp) {
    try {
      const user = await User.findOneAndUpdate({ email }, { otp });
      if (user) {
        console.log('OTP saved successfully');
        return user;
      } else {
        console.log('Failed to save OTP');
        return null;
      }
    } catch(error) {
      console.error(error);
      return error;
    }
  }

  async updateUser(email, data) {
    try {
      const user = await User.findOneAndUpdate({ email }, data, { new: true });
      if (user) {
        console.log('User updated successfully');
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
