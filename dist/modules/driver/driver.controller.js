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
exports.driverController = void 0;
const ride_model_1 = require("../ride/ride.model");
const user_model_1 = require("../user/user.model");
const requestPermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        const { driver_status } = req.body;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const id = user.id;
        const lastestDrive = yield ride_model_1.Rides.findOne({ driver_id: id }).sort({
            createdAt: -1,
        });
        if (!lastestDrive) {
            return res.status(404).json({
                status: false,
                message: "No Drive founded",
            });
        }
        // mangae reject on rider
        if (!driver_status) {
            return res.status(400).json({
                status: false,
                message: "Accpet or Reject",
            });
        }
        lastestDrive.driver_status = driver_status;
        yield lastestDrive.save();
        return res.status(201).json({
            status: true,
            message: "Drive Status Update",
            data: lastestDrive,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
});
// lasted request
const lastestRides = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ status: false, message: "Unauthorized" });
        }
        const userId = req.user.id;
        const lastestRides = yield ride_model_1.Rides.findOne({
            driver_id: userId,
            isCompleteRide: false,
        }).sort({ createdAt: -1 });
        // bug here time related
        console.log(lastestRides);
        if (!lastestRides) {
            return res.status(404).json({
                status: false,
                message: "No Rides Founded",
            });
        }
        return res.status(200).json({
            status: true,
            message: "Got new rides",
            data: lastestRides,
        });
    }
    catch (error) {
        return res.status(500).json({
            staus: false,
            message: "No Current Ride founded",
            error: error.stack,
        });
    }
});
const rideStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        const id = user === null || user === void 0 ? void 0 : user.id;
        const status = yield ride_model_1.Rides.findOne({ driver_id: id, isCompleteRide: false }).sort({
            createdAt: -1,
        });
        console.log(id, status);
        if (!status) {
            return res.status(404).json({
                status: false,
                message: "No Drive founded",
            });
        }
        const { status_update } = req.body;
        console.log(status_update, status, " status ");
        if (!status_update) {
            return res.status(400).json({
                status: false,
                message: "Input Your Status",
            });
        }
        // Update fields if they exist
        if (status_update.rider_status) {
            status.rider_status = status_update.rider_status;
            // Automatically mark ride complete
            if (status_update.rider_status === "COMPLETED") {
                status.isCompleteRide = true;
            }
        }
        yield status.save();
        return res.status(201).json({
            status: true,
            message: "Ride Status Update",
            data: status,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
});
const earningHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const id = user.id;
        const totalRidesDriver = yield ride_model_1.Rides.find({ driver_id: id, isCompleteRide: true });
        const earning_history = yield ride_model_1.Rides.aggregate([
            { $match: { driver_id: id } },
            { $group: { _id: id, totalEarning: { $sum: "$fare" } } },
            { $project: { _id: false, totalEarning: true } },
        ]);
        const count = yield ride_model_1.Rides.countDocuments({ driver_id: id });
        return res.status(200).json({
            status: true,
            meta: {
                totalEarning: earning_history,
                totalRide: count,
                data: totalRidesDriver,
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            staus: false,
            message: error.message,
        });
    }
});
const onlineStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { user_status } = req.body;
    try {
        const id = user.id;
        const user_data = yield user_model_1.User.findByIdAndUpdate(id, {
            availability_status: user_status,
        }, { new: true });
        if (!user_data) {
            return res.status(404).json({
                status: false,
                message: "User Not founded",
            });
        }
        console.log(user_status);
        // user_data.availability_status = user_status;
        yield user_data.save();
        return res.status(201).json({
            status: true,
            message: "User Status Update",
            data: user_data,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
});
// ride history 
const rideHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const sortBy = req.query.sortBy === "asc" ? 1 : -1;
        const status = req.query.status; // optional filter
        const filter = { driver_id: userId, isCompleteRide: true };
        if (status)
            filter.driver_status = status;
        const totalDocument = yield ride_model_1.Rides.countDocuments(filter);
        const totalPages = Math.ceil(totalDocument / limit);
        const allRideByDriver = yield ride_model_1.Rides.find(filter)
            .sort({ createdAt: sortBy })
            .skip((page - 1) * limit)
            .limit(limit);
        return res.status(200).json({
            status: true,
            message: "All Driver Ride History Fetched",
            data: allRideByDriver,
            meta: {
                totalPages,
                page,
                limit,
                totalDocument,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: "No data found",
            error: error.stack,
        });
    }
});
exports.driverController = {
    requestPermission,
    rideStatus,
    earningHistory,
    onlineStatus,
    lastestRides,
    rideHistory
};
