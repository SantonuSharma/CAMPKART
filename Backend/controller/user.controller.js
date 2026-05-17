import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        const user = await User.findOne({
            email
        });

        if (user) {

            return res.status(400).json({
                message: "User already exist!"
            });

        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const createUser = new User({

            username: username,
            email: email,
            password: hashPassword

        });

        await createUser.save();

        res.status(201).json({
            message: "Registered successfully", user: {
                _id: createUser._id,
                username: createUser.username
            }
        });

    } catch (error) {

        console.log("Error: " + error.message);

        res.status(500).json({
            message: "Internal server error"
        });

    }

};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials!"
            });
        }

        // Compare password
        const isMatch = await bcryptjs.compare(
            password,
            user.password
        );

        // Check password
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials!"
            });
        }

        // Success
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                username: user.username
            }
        });

    } catch (error) {
        console.log("Error: " + error.message);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};