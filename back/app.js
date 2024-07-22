require('dotenv').config();

const express = require('express');
// Files
const connectDB = require('./config');
const User = require('./models/userModel');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
    connectDB();
})

