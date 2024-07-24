import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs' // For encrypting the password inside database for security
import { errorHandler } from '../utils/error.js';

const signup = async (req, res, next) => { // First is insert next
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10); // And this is how to use it
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })

    try {
        await newUser.save();
        res.status(201).json({ message: "User successfully sent" });   
    } catch (error) {
        next(errorHandler(300, "Handles custom error")); // This is how to use the middleware for handling errors
    }
}

export default signup