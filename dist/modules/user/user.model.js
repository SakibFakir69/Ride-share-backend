"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: [6, "Too short"],
    },
    phone: {
        type: Number,
    },
    role: {
        type: String,
        enum: Object.values(user_interface_1.Role),
        default: user_interface_1.Role.RIDER,
    },
    availability_status: {
        type: String,
        enum: Object.values(user_interface_1.AvailabilityStatus),
        default: user_interface_1.AvailabilityStatus.ONLINE,
    },
    account_status: {
        type: String,
        enum: Object.values(user_interface_1.AccountStatus), // ✅ fixed enum
        default: user_interface_1.Account_status.APPROVED,
    },
    driver_status: {
        type: String,
        enum: Object.values(user_interface_1.DriverStatus),
        default: user_interface_1.DriverStatus.PENDING,
    },
    account: {
        type: String,
        enum: Object.values(user_interface_1.Account_status),
        default: user_interface_1.AccountStatus.UNBLOCK,
    },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("user", UserSchema);
