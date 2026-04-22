const rideModel = require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');
const mapsService = require('./maps.service');
const crypto = require('crypto');



// Move to config or constants file
const FARE_CONFIG = {
    auto: { perKm: 10, perMinute: 2, baseFare: 30 },
    car: { perKm: 25, perMinute: 4, baseFare: 75 },
    motorcycle: { perKm: 8, perMinute: 1.5, baseFare: 15 }
};

const VALID_VEHICLE_TYPES = Object.keys(FARE_CONFIG);

// Calculate fare for specific vehicle type only
function calculateFareForType(distanceInKm, timeInMinutes, vehicleType) {
    const config = FARE_CONFIG[vehicleType];
    const fare = config.baseFare + (distanceInKm * config.perKm) + (timeInMinutes * config.perMinute);
    return Math.round(fare);
}

// Get all fares (only when needed)
function getAllFares(distanceInKm, timeInMinutes) {
    const fares = {};
    for (const type of VALID_VEHICLE_TYPES) {
        fares[type] = calculateFareForType(distanceInKm, timeInMinutes, type);
    }
    return fares;
}

// OTP generation and verification can be added here as needed, but is omitted for brevity

function generateOTP(length = 6) {
  const max = 10 ** length;
  const otp = crypto.randomInt(0, max);
  return otp.toString().padStart(length, '0');
}



// createRide and 
module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("All fields are required");
    }

    if (!VALID_VEHICLE_TYPES.includes(vehicleType)) {
        throw new Error("Invalid vehicle type");
    }

    const distanceAndTime = await mapsService.getDistanceAndTime(pickup, destination);
    
    // Use raw values from API
    const distanceInKm = distanceAndTime.raw.distanceMeters / 1000;
    const timeInMinutes = distanceAndTime.raw.durationSeconds / 60;

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        vehicleType,
        otp: generateOTP(6), // Generate OTP at ride creation
        fare: calculateFareForType(distanceInKm, timeInMinutes, vehicleType),
        distance: parseFloat(distanceInKm.toFixed(2)),
        duration: parseFloat(timeInMinutes.toFixed(2)),
        status: 'requested'
    });

    return ride;
};



// Separate function if you need all fares (for UI display)
module.exports.getAllFares = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceAndTime = await mapsService.getDistanceAndTime(pickup, destination);
    const distanceInKm = distanceAndTime.raw.distanceMeters / 1000;
    const timeInMinutes = distanceAndTime.raw.durationSeconds / 60;

    return getAllFares(distanceInKm, timeInMinutes);
};


// confirm ride
module.exports.confirmRide = async (rideId, captainId) => {
    if(!rideId) {
        throw new Error('Ride ID is required');
    }
    if(!captainId) {
        throw new Error('Captain ID is required');
    }
      
    await rideModel.findOneAndUpdate({
        _id: rideId,
    },{
        status: 'accepted',
        captain: captainId
    })
    
    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
}

module.exports.startRide = async (rideId, otp, captainId) => {
    if(!rideId || !otp  ) {
        throw new Error('Ride ID, OTP and Captain ID are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captainId,
        otp: otp,
        status: 'accepted'
    }).populate('user').populate('captain').select('+otp');

    if(!ride) {
        throw new Error('Invalid ride ID, OTP, or captain');
    }

    if(ride.otp!== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId,
    },{
        status: 'ongoing',
    })

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    });

    return ride;
}

module.exports.endRide = async (rideId, captainId) => { 
    if(!rideId || !captainId) { 
        throw new Error('Ride ID and Captain ID are required');
    }
   
    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captainId,
        status: 'ongoing'
    }).populate('user').populate('captain').select('+otp');

    if(!ride) {
        throw new Error('Invalid ride ID or captain, or ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId,
    },{
        status: 'completed',
    })

    return ride;
}
