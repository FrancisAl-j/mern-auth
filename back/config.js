import dotenv from 'dotenv'
dotenv.config();

import mongoose from 'mongoose';

const connectDB = () => {
    try {
        mongoose.connect(process.env.DB)
        console.log('Connected to database');
    } catch (error) {
        console.log('Failed to connect to database');
    }
}

export default connectDB;