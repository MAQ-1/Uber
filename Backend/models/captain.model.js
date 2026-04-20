const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    Fullname: {
        Firstname: {
            type: String,
            required: true,
            minlength: [3, "Firstname should be at least 3 characters long"],
        },
        Lastname: {
            type: String,
            minlength: [3, "Lastname should be at least 3 characters long"],
            validate: {
                validator: function(v) { return !v || v.length >= 3; },
                message: "Lastname should be at least 3 characters long"
            }
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, "Password should be at least 6 characters long"]
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: { type: String, required: true, minlength: [3, "Color should be at least 3 characters long"] },
        plate: { type: String, required: true, minlength: [3, "Plate should be at least 3 characters long"] },
        capacity: { type: Number, required: true, min: [1, "Capacity should be at least 1"] },
        vehicleType: { type: String, required: true, enum: ['car', 'motorcycle', 'auto'] }
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            default: [0, 0]
        }
    }
});

captainSchema.index({ location: '2dsphere' });

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ captainId: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model('captain', captainSchema);

// Ensure geospatial index exists
captainModel.collection.createIndex({ location: '2dsphere' }).catch(err => {
    if (err.code !== 85) { // 85 = index already exists
        console.error('Error creating geospatial index:', err);
    }
});

module.exports = captainModel;
