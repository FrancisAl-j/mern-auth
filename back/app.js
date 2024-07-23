import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
//files
import connectDB from './config.js';
//import User from './models/userModel.js';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Listening to port ${PORT}`);
    connectDB();
})

// API routes
app.use('/user', userRoute);

app.use('/auth', authRoute);