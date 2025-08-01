"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rides = void 0;
const mongoose_1 = require("mongoose");
const ride_interface_1 = require("./ride.interface");
const user_interface_1 = require("../user/user.interface");
const LocationSchema = new mongoose_1.Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String },
}, { _id: false } // prevent separate _id for nested object
);
const rideSchema = new mongoose_1.Schema({
    rider_id: {
        type: String,
        ref: "user",
        required: true,
    },
    driver_id: {
        type: String,
        ref: "user",
        required: true,
    },
    fare: {
        type: Number,
        required: true,
    },
    location: {
        type: LocationSchema,
        required: true,
    },
    destination: {
        type: LocationSchema,
        required: true,
    },
    payment_status: {
        type: String,
        enum: Object.values(ride_interface_1.PaymentStatus),
        default: ride_interface_1.PaymentStatus.UNPAID,
    },
    rider_status: {
        type: String,
        enum: Object.values(ride_interface_1.RideStatus),
    },
    driver_status: {
        type: String,
        enum: Object.values(ride_interface_1.DriverStatus),
    },
    pick_up_location: {
        type: LocationSchema,
        required: true,
    },
    isCompleteRide: {
        type: Boolean,
        default: false,
    },
    availability_status: {
        type: String,
        enum: Object.values(user_interface_1.AvailabilityStatus.ONLINE)
    }
}, { timestamps: true });
// pre save 
// function driver ar details
exports.Rides = (0, mongoose_1.model)("ride", rideSchema);
