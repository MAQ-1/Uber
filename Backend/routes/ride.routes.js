const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Create a ride
router.post('/create',
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination'),
    body('vehicleType').isIn(['auto', 'car', 'motorcycle']).withMessage('Invalid vehicle type'),
    authMiddleware.authUser,
    rideController.createRide
);

// Get all fares for comparison
router.get('/get-fares',
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination'),
    authMiddleware.authUser,
    rideController.getAllFares
);

module.exports = router;
