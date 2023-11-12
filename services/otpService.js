class OTPService {
  constructor() {
    this.otpLength = 4;
  }

  async generateOTP() {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < this.otpLength; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }

  async verifyOTP(otp, userEnteredOTP) {
    return otp === userEnteredOTP;
  }
}

export default new OTPService();
