const captainModel = require('../models/captain.model');
const { validationResult } = require('express-validator');
const blacklistModel = require('../models/blacklist.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Register a new captain
module.exports.registerCaptain = async (req, res) => {
    // Check for validation errors from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { Fullname, email, password, vehicle } = req.body;

        // Check if a captain with the same email already exists
        const existingCaptain = await captainModel.findOne({ email });
        if (existingCaptain) {
            return res.status(400).json({ message: "Captain with this email already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await captainModel.hashPassword(password);

        // Create the captain record in the database
        const captain = await captainModel.create({
            Fullname: {
                Firstname: Fullname.Firstname,
                Lastname: Fullname.Lastname
            },
            email,
            password: hashedPassword,
            vehicle: {
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity,
                vehicleType: vehicle.vehicleType
            }
        });

        // Generate JWT token for the newly registered captain
        const token = await captain.generateAuthToken();

        res.status(201).json({
            message: "Captain registered successfully",
            token,
            captain
        });

    } catch (error) {
        console.log("Error registering captain:", error);
        res.status(500).json({ message: "Error registering captain" });
    }
}


// Login a captain
module.exports.loginCaptain = async (req, res) => {
    // Check for validation errors from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        // Ensure both fields are present
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find captain by email and explicitly select password (excluded by default)
        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare provided password with stored hashed password
        const match = await captain.comparePassword(password);
        if (!match) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token and set as httpOnly cookie
        const token = await captain.generateAuthToken();
        res.cookie("token", token, { httpOnly: true });

        res.status(200).json({
            message: "Captain logged in successfully",
            token,
            captain
        });

    } catch (error) {
        console.log("Error logging in captain:", error);
        res.status(500).json({ message: "Error logging in captain" });
    }
}

// Get captain profile
module.exports.getCaptainProfile = async (req, res) => {
    res.status(200).json({
        message: "Captain profile retrieved successfully",
        captain: req.captain
    });
}

// Logout a captain
module.exports.logoutCaptain = async (req, res) => {
 const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');
   
    await blacklistModel.create({ token: token });

    res.clearCookie("token");
    res.status(200).json({ message: "Captain logged out successfully" });
}