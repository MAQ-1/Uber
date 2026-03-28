const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistModel = require('../models/blacklist.model');


// Register a new user
module.exports.registerUser = async (req, res, next) => {
    try {
        // Check for validation errors from express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { Fullname, email, password } = req.body;

        // Check if a user with the same email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await userModel.hashPassword(password);

        // Create the user via service
        const user = await userService.createUser({
            Firstname: Fullname.Firstname,
            Lastname: Fullname.Lastname,
            email,
            password: hashedPassword
        });

        // Generate JWT token for the newly registered user
        const token = user.generateAuthToken();

        res.status(201).json({
            message: "User registered successfully",
            token,
            user
        });

    } catch (error) {
        console.log("Error registering user:", error);
        res.status(500).json({ message: "Error registering user" });
    }
}


// Login a user
module.exports.loginuser = async (req, res) => {
    try {
        // Check for validation errors from express-validator
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }

        const { email, password } = req.body;

        // Ensure both fields are present
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email and explicitly select password (excluded by default)
        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare provided password with stored hashed password
        const match = await user.comparePassword(password);
        if (!match) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = user.generateAuthToken();

        // Set token as httpOnly cookie
        res.cookie("token", token, { httpOnly: true });

        return res.status(200).json({
            message: "User logged in successfully",
            token,
            user
        });

    } catch (error) {
        console.log("Error Logging the user:", error);
        res.status(500).json({ message: "Error logging the user" });
    }
}


// Get authenticated user's profile
module.exports.getUserProfile = async (req, res) => {
    // req.user is set by the auth middleware
    res.status(200).json({
        message: "User profile retrieved successfully",
        user: req.user
    });
}


// Logout a user
module.exports.logoutUser = async (req, res) => {
    // Extract token from cookie or Authorization header
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

    // Clear the token cookie from the client
    res.clearCookie('token');

    // Blacklist the token to prevent reuse
    await blacklistModel.create({ token });

    res.status(200).json({ message: "User logged out successfully" });
}
