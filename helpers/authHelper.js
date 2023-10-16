const bcrypt = require('bcrypt');
const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(`some error occurred while encrypting password`.bgRed.white)
    }
}
const generateOTP = async () => {
    const min = 100000;
    const max = 999999;
    const otp = Math.floor(Math.random() * (max - min + 1)) + min;

    return otp.toString(); // Convert the number to a string
}

const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}


module.exports = {
    hashPassword,
    generateOTP,
    comparePassword,
}