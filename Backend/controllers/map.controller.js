const mapservice = require('../services/maps.service');
const { validationResult } = require('express-validator')   

// give langitude and longitude of an address
module.exports.getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    try {
        const coordinates = await mapservice.getAddressCoordinate(address);
        return res.status(200).json({
            message: 'Coordinates retrieved successfully',
            coordinates
        });
    } catch (error) {
        if (error.message === 'Address not found') {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// give distance and time between two addresses
module.exports.getDistanceAndTime = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    try {
        const distanceAndTime = await mapservice.getDistanceAndTime(origin, destination);
        return res.status(200).json({
            message: 'Distance and time retrieved successfully',
            distance: distanceAndTime.distance,
            duration: distanceAndTime.duration,
            raw: distanceAndTime.raw
        });

    } catch (error) {
        if (error.message === 'Origin and destination are required') {
            return res.status(400).json({ message: error.message });
        }
        if (error.message === 'No route found between the specified addresses' || error.message === 'Address not found') {
            return res.status(404).json({ message: error.message });
        }
        console.error('Controller Error:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }

}

// suggestions for addresses based on partial input
module.exports.getAddressSuggestions = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }   

    const { input } = req.query;
    try{
     const suggestions = await mapservice.getAddressSuggestions(input);
     return res.status(200).json({
        message: 'Suggestions retrieved successfully',
        suggestions: suggestions
     });
    }catch(err){
        console.error('Controller Error:', err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
