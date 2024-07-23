import User from '../models/userModel.js';

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({
        username,
        email,
        password
    })

    try {
        await newUser.save();
        res.status(201).json({ message: "User successfully sent" });   
    } catch (error) {
        res.status(500).json({ message: "User already exist" })
    }
}

export default signup