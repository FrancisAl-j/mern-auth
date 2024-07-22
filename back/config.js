require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = () => {
    try {
        mongoose.connect(process.env.DB)
        console.log('Connected to database');
    } catch (error) {
        console.log('Failed to connect to database');
    }
}

module.exports = connectDB