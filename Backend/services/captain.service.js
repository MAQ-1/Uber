const captainModel = require('../models/captain.model');

module.exports.createCaptain = async({
    Firstname,
    Lastname,
    email,
    password,
    VehicleColor,
    Plate,
    capacity,
    vehicleType
})=>{
    if(!Firstname || !email || !password || !VehicleColor || !Plate || !capacity || !vehicleType){
        throw new Error("All fields are required");
    }

    const captain = await captainModel.create({
        Fullname:{
            Firstname,
            Lastname
        },
        email,
        password,
        vehicle: {
            color: VehicleColor,
            plate: Plate,
            capacity,
            vehicleType
        }
    });

    return captain;
};