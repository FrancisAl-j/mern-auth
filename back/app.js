import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
//files
import connectDB from './config.js';
import User from './models/userModel.js';
import userRoute from './routes/userRoute.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Listening to port ${PORT}`);
    connectDB();
})

// API routes
app.use('/user', userRoute);