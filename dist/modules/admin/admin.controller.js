"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const user_interface_1 = require("../user/user.interface");
const user_model_1 = require("../user/user.model");
const ride_model_1 = require("../ride/ride.model");
// Get all drivers
const allDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allData = yield user_model_1.User.find({ role: user_interface_1.Role.DRIVER });
        if (allData.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No drivers found",
            });
        }
        return res.status(200).json({
            status: true,
            message: "All driver data fetched",
            data: allData,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
});
// Get all users (riders)
const allUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allData = yield user_model_1.User.find({ role: user_interface_1.Role.RIDER });
        if (allData.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No riders found",
            });
        }
        return res.status(200).json({
            status: true,
            message: "All rider data fetched",
            data: allData,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
});
// Get all rides
const allRides = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allRide = yield ride_model_1.Rides.find({});
        if (allRide.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No rides found",
            });
        }
        return res.status(200).json({
            status: true,
            message: "All rides fetched",
            data: allRide,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
});
// Approve/suspend driver
const updateDriverStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { account_status } = req.body;
        console.log(req.body);
        if (!userId) {
            return res.status(404).json({
                status: false,
                message: "Enter User Id"
            });
        }
        if (!account_status) {
            return res.status(404).json({
                status: false,
                message: "Enter your status"
            });
        }
        const userupdateStatus = yield user_model_1.User.findByIdAndUpdate(userId, { account_status: account_status }, {
            new: true
        });
        return res.status(201).json({
            status: true,
            message: "User Account Status Update",
            data: userupdateStatus,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
});
// Block/unblock user accounts
const update_Account = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { account } = req.body;
        if (!userId) {
            return res.status(404).json({
                status: false,
                message: "Enter User Id"
            });
        }
        if (!account) {
            return res.status(404).json({
                status: false,
                message: "Enter your status"
            });
        }
        const userupdateStatus = yield user_model_1.User.findByIdAndUpdate(userId, { account: account }, {
            new: true
        });
        return res.status(201).json({
            status: true,
            message: "User Account Status Update",
            data: userupdateStatus,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
});
exports.adminController = { allDriver, allUser, allRides, updateDriverStatus, update_Account };
