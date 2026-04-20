const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapsService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');

module.exports.createRide = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }
    
    const { pickup, destination, vehicleType } = req.body;
    const userId = req.user._id; // Get from authenticated user
    
    try {
        const pickupCoords = await mapsService.getAddressCoordinate(pickup);
        const destCoords = await mapsService.getAddressCoordinate(destination);

        const captainInRadius = await mapsService.getCaptainInTheRadius(pickupCoords.lng, pickupCoords.lat, 10); // 10 km radius
        console.log('Captains in radius:', captainInRadius);
        
        if (captainInRadius.length === 0) {
            const allCaptains = await require('../models/captain.model').find({});
            console.log('All captains in DB:', allCaptains.map(c => ({ 
                name: c.Fullname.Firstname, 
                location: c.location?.coordinates 
            })));
        }

        const ride = await rideService.createRide({ 
            user: userId, 
            pickup, 
            destination, 
            vehicleType 
        });
       
        ride.otp=""

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
        // Send new-ride event to all captains in radius
        captainInRadius.forEach(captain => {
            if (captain.socketId) {
                console.log('Sending new-ride to captain:', captain.Fullname.Firstname, 'socketId:', captain.socketId);
                sendMessageToSocketId(captain.socketId, {
                    event: 'new-ride',
                    data: {
                        rideId: ride._id,
                        pickup,
                        destination,
                        vehicleType,
                        pickupCoords,
                        destCoords,
                        fare: ride.fare,
                        user: {
                            fullname: {
                                firstname: rideWithUser.user.Fullname.Firstname,
                                lastname: rideWithUser.user.Fullname.Lastname
                            }
                        }
                    }
                });
            }
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


module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;
    try{ 
        const ride= await rideService.confirmRide(rideId, req.captain._id);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data:ride
        });



        return res.status(200).json({ message: 'Ride confirmed successfully', ride });
        
       
    }
    catch(error){
        console.error('Controller Error:', error.message);
        return res.status(500).json({ message: error.message || 'Internal server error' });
    }
}