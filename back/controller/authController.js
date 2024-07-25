import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs' // For encrypting the password inside database for security
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

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
        next(error);
    }
}


const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if(!validUser) return next(errorHandler(404, "User not found"))
        
        const validPassword = await bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401, "Invalid Credentials"));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        res.cookie('token', token, { httpOnly: true }).status(200).json(validUser)
    } catch (error) {
        next(error);
    }
}


export default { signup, signin }