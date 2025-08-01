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
        const status = req.body;
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
        if (!status) {
            return res.status(400).json({
                status: false,
                message: "Accpet or Reject",
            });
        }
        lastestDrive.driver_status = status.driver_status;
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
const rideStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        const id = user === null || user === void 0 ? void 0 : user.id;
        const status = yield ride_model_1.Rides.findOne({ driver_id: id }).sort({
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
        status.rider_status = status_update.rider_status;
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
        const totalRidesDriver = yield ride_model_1.Rides.find({ driver_id: id });
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
exports.driverController = {
    requestPermission,
    rideStatus,
    earningHistory,
    onlineStatus,
};
