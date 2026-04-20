const mongoose = require('mongoose');


const rideSchema = new mongoose.Schema({
     user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
     },
     captain:{
        type: mongoose.Schema.Types.ObjectId,     
        ref: 'captain'
     },
     pickup:{
        type: String,
        required: true,
     },
     destination:{
        type: String,
        required: true,
     },
     fare:{
        type: Number,
        required: true,
     },
     status:{
        type: String,
        enum: ['requested', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'requested'
     },
     duration:{
        type: Number, // in minutes
     },
     distance:{
        type: Number, // in kilometers
     },
     vehicleType:{
        type: String,
        enum: ['auto', 'car', 'motorcycle'],
        required: true
     },
    paymentId:{
        type: String,
    },
    orderId:{
        type: String,
    },
    signature:{
        type: String,
    },
    otp:{
      type: String,
      select: false, // Hide OTP by default
      required: true
    }
});

module.exports = mongoose.model('Ride', rideSchema);
