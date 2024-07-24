import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs' // For encrypting the password inside database for security

const signup = async (req, res) => {
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
        res.status(500).json({ message: "User already exist" })
    }
}

export default signup