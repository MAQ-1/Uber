const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');
const dotenv = require('dotenv');
dotenv.config();


// Middleware to authenticate a user via JWT
module.exports.authUser = async (req, res, next) => {
    // Extract token from cookie or Authorization header
    const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');

    // Reject request if no token is provided
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("Token received in auth middleware:", token);

    // Check if the token has been blacklisted (i.e. user already logged out)
    const isBlacklisted = await blacklistModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by the decoded userId and attach to request
        const user = await userModel.findById(decoded.userId);
        req.user = user;

        return next();
    } catch (error) {
        console.log("Error authenticating user:", error);
        res.status(401).json({ message: "Error authenticating user" });
    }
}


// Middleware to authenticate a captain via JWT
module.exports.authCaptain = async (req, res, next) => {
    // Extract token from cookie or Authorization header
    const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');

    // Reject request if no token is provided
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if the token has been blacklisted (i.e. captain already logged out)
    const isBlacklisted = await blacklistModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the captain by the decoded captainId and attach to request
        const captain = await captainModel.findById(decoded.captainId);
        req.captain = captain;

        return next();
    } catch (error) {
        console.log("Error authenticating captain:", error);
        res.status(401).json({ message: "Error authenticating captain" });
    }
}
