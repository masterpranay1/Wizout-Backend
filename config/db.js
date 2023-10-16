const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/tatabackend');
        console.log('db connected successfully');
    } catch (error) {
        console.log('error in db connecting');
    }
}


module.exports = connectDB;