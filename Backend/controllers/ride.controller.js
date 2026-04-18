const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');

module.exports.createRide = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }
    
    const { pickup, destination, vehicleType } = req.body;
    const userId = req.user._id; // Get from authenticated user
    
    try {
        const ride = await rideService.createRide({ 
            user: userId, 
            pickup, 
            destination, 
            vehicleType 
        });
        return res.status(201).json({ message: 'Ride created successfully', ride });

    } catch (error) {
        console.error('Controller Error:', error.message);
        return res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

module.exports.getAllFares = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fares = await rideService.getAllFares(pickup, destination);
        return res.status(200).json({ 
            message: 'Fares retrieved successfully',
            fares 
        });

    } catch (error) {
        console.error('Controller Error:', error.message);
        return res.status(500).json({ message: error.message || 'Internal server error' });
    }
};
