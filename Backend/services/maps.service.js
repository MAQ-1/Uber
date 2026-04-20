const axios = require('axios');
const CaptainModel = require('../models/captain.model');
// langitude and longitude of an address
module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GEOAPIFY_API_KEY;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.features && response.data.features.length > 0) {
            const { lat, lon } = response.data.features[0].properties;
            console.log(`Coordinates for "${address}":`, { lat, lon });
            return {
                lat,
                lng: lon
            };
        } else {
            throw new Error('Address not found');
        }
    } catch (error) {
        if (error.message === 'Address not found') throw error;
        console.error('Geoapify API Error:', error.message);
        throw new Error('Failed to fetch coordinates');
    }
}

// give distance and time between two addresses
module.exports.getDistanceAndTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GEOAPIFY_API_KEY;

    try {
        // Step 1: Get coordinates for origin and destination first
        const originCoords = await exports.getAddressCoordinate(origin);
        const destCoords = await exports.getAddressCoordinate(destination);

        console.log('Route calculation:', {
            from: { address: origin, coords: originCoords },
            to: { address: destination, coords: destCoords }
        });

        // Step 2: Use Geoapify Routing API with coordinates
        // Format: waypoints=lat,lon|lat,lon
        const url = `https://api.geoapify.com/v1/routing?waypoints=${originCoords.lat},${originCoords.lng}|${destCoords.lat},${destCoords.lng}&mode=drive&apiKey=${apiKey}`;

        const response = await axios.get(url);

        if (response.data.features && response.data.features.length > 0) {
            const route = response.data.features[0].properties;
            
            console.log('Raw API response:', {
                distanceMeters: route.distance,
                durationSeconds: route.time
            });

            const distanceInKm = (route.distance / 1000).toFixed(2);
            const totalMinutes = Math.floor(route.time / 60);
            const totalHours = Math.floor(totalMinutes / 60);
            const totalDays = Math.floor(totalHours / 24);

            const remainingHours = totalHours % 24;
            const remainingMinutes = totalMinutes % 60;

            let durationString = '';
            if (totalDays > 0) durationString += `${totalDays} day${totalDays > 1 ? 's' : ''} `;
            if (remainingHours > 0) durationString += `${remainingHours} hr${remainingHours > 1 ? 's' : ''} `;
            durationString += `${remainingMinutes} min${remainingMinutes > 1 ? 's' : ''}`;

            return {
                distance: `${distanceInKm} km`,
                duration: durationString.trim(),
                raw: {
                    distanceMeters: route.distance,
                    durationSeconds: route.time
                },
                Status: 'Success'
            };
        } else {
            throw new Error('No route found between the specified addresses');
        }

    } catch (err) {
        console.error('Geoapify Routing Error:', err.message);
        throw new Error('Failed to fetch distance and time');
    }
}

module.exports.getAddressSuggestions = async (input) => {

    if(!input) {
        throw new Error('Input is required');
    }
    const apiKey = process.env.GEOAPIFY_API_KEY;
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(input)}&apiKey=${apiKey}`;  

    try {
        const response = await axios.get(url);

        if (response.data.features && response.data.features.length > 0) {
            return response.data.features
                .map(feature => ({
                    description: feature.properties.formatted,
                    place_id: feature.properties.place_id,
                    main_text: feature.properties.name || feature.properties.street || feature.properties.address_line1,
                    secondary_text: feature.properties.address_line2,
                    coordinates: {
                        lat: feature.properties.lat,
                        lng: feature.properties.lon
                    },
                    type: feature.properties.result_type
                }))
                .filter(item => item.description !== undefined);
        } else {
            throw new Error('No suggestions found for the given input');
        }
    } catch (error) {
        console.error('Geoapify Autocomplete Error:', error.message);
        throw new Error('Failed to fetch address suggestions');
    }
}


module.exports.getCaptainInTheRadius=async(lng, lat, radius)=>{ 
    const captains = await CaptainModel.find({
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [lng, lat]
                },
                $maxDistance: radius * 1000 // convert km to meters
            }
        }
    });
    
    console.log('[getCaptainInTheRadius] Query result count:', captains.length);
    return captains;
}