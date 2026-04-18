const express = require('express');
const router = express.Router();
const mapController = require('../controllers/map.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { query } = require('express-validator');

// langitude and longitude of an address
router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }).withMessage('Address must be at least 3 characters long'),
    authMiddleware.authUser,
    mapController.getCoordinates
);

// distance and time between two addresses
router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }).withMessage('Origin must be at least 3 characters long'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Destination must be at least 3 characters long'),
    authMiddleware.authUser,
    mapController.getDistanceAndTime
)

// suggestions for addresses based on partial input

router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }).withMessage('Input must be at least 3 characters long'),
    authMiddleware.authUser,
    mapController.getAddressSuggestions
)

module.exports = router;