const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    primary_email: {
        type: String,
        required: true,
        unique: true
    },
    secondary_email: {
        type: String,
        required: true
    },
    p_number: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '1h' },
    }
}, { timestamps: true })


const otpModel = mongoose.model('otpModel', otpSchema);

module.exports = otpModel;