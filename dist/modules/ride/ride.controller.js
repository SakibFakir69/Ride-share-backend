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
exports.rideControllers = void 0;
const user_model_1 = require("../user/user.model");
const user_interface_1 = require("../user/user.interface");
const ride_model_1 = require("./ride.model");
const ride_interface_1 = require("./ride.interface");
// const rideRequest = async (req:AuthenticatedRequest, res: Response) => {
//   try {
//     const { destination, pickup } = req.body;
//     console.log(req.body, " req");
//     if (!destination || !pickup) {
//       return res.status(400).json({
//         status: false,
//         message: "Fill The Input Right Way",
//       });
//     }
//     const oneDriver = await User.findOne({ role: Role.DRIVER });
//     if (!oneDriver || oneDriver.account_status === AccountStatus.BLOCK) {
//       return res.status(404).json({
//         status: false,
//         message: "Not Founded Driver",
//       });
//     }
//     const id = req.user.id ;
//     console.log(id, " id ");
//     // if driver staus .in tranis === not snd data and snd wating list
//     //
//     const rideRequest = await Rides.create({
//       rider_id: id,
//       driver_id: oneDriver._id, // match driver here
//       fare: 100,
//       location: pickup,
//       destination: destination,
//       pick_up_location: pickup,
//       payment_status: PaymentStatus.UNPAID,
//       rider_status:RideStatus.PENDING,
//       driver_status: DriverStatus.NONE,
//     });
//     return res.status(200).json({
//       status: true,
//       message: "Driver founded",
//       data: oneDriver,
//       deatils: rideRequest,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };
// ride cancel
const rideRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authReq = req;
    try {
        console.log(req.body);
        const { current, destination } = req.body;
        if (!destination || !current) {
            return res.status(400).json({
                status: false,
                message: "Fill The Input Right Way",
            });
        }
        const oneDriver = yield user_model_1.User.findOne({
            role: user_interface_1.Role.DRIVER,
            availability_status: user_interface_1.AvailabilityStatus.ONLINE,
        }).sort({ createdAt: -1 });
        console.log(oneDriver);
        if (!oneDriver) {
            return res.status(404).json({
                status: false,
                message: "Not Founded Driver",
                data: oneDriver,
            });
        }
        const id = authReq.user.id; // Now no TS error
        const rideRequest = yield ride_model_1.Rides.create({
            rider_id: id,
            driver_id: oneDriver._id,
            fare: 100,
            current: current,
            destination: destination,
            payment_status: ride_interface_1.PaymentStatus.UNPAID,
            rider_status: ride_interface_1.RideStatus.PENDING,
            driver_status: user_interface_1.DriverStatus.NONE,
        });
        return res.status(200).json({
            status: true,
            message: "Driver founded",
            data: oneDriver,
            details: rideRequest,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
});
const rideCancel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    console.log(userId);
    try {
        const latestRide = yield ride_model_1.Rides.findOne({ rider_id: userId }).sort({
            createdAt: -1,
        });
        console.log(latestRide, " ride ");
        if (!latestRide) {
            return res.status(404).json({
                status: false,
                message: "Ride not found",
            });
        }
        if (latestRide.rider_status === ride_interface_1.RideStatus.CANCELLED) {
            return res.status(200).json({
                status: true,
                message: "Ride Allready Cancled",
            });
        }
        // if driver recive you can not cancel
        if (latestRide.driver_status === user_interface_1.DriverStatus.ACCEPT) {
            return res.status(400).json({
                status: true,
                message: "You Can Not Cancel Ride",
            });
        }
        //  save
        latestRide.rider_status = ride_interface_1.RideStatus.CANCELLED;
        yield latestRide.save();
        return res.status(200).json({
            status: true,
            message: "Ride cancelled successfully",
            data: latestRide,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            messafe: error.message,
        });
    }
});
// my all ride
// const allRide = async (req:AuthenticatedRequest, res: Response) => {
//   try {
//     const id = req.user.id;
//     console.log(id, " me ");
//     const allData = await Rides.find({ rider_id: id , rider_status:{$ne:RideStatus.CANCELLED} });
//     console.log(id, allData);
//     if (!allData) {
//       return res.status(404).json({
//         status: false,
//         messsage: "User Data Not Founded",
//       });
//     }
//     const count = await Rides.countDocuments({ rider_id: id });
//     const totalCost = await Rides.aggregate([
//       { $match: { rider_id: id } },
//       { $group: { _id: id, totalFare: { $sum: "$fare" } } },
//       { $project: { _id: false, totalFare: true } },
//     ]);
//     return res.json({
//       status: true,
//       message: "Ride History",
//       data: allData,
//       meta: {
//         count: count,
//         totalCost: totalCost,
//       },
//     });
//   } catch (error: any) {
//     console.log(error);
//     res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };
const allRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Cast here to assert `user` exists on req
        const authReq = req;
        const id = authReq.user.id;
        console.log(id, " me ");
        const allData = yield ride_model_1.Rides.find({
            rider_id: id,
            rider_status: { $ne: ride_interface_1.RideStatus.CANCELLED },
        });
        console.log(id, allData);
        if (!allData) {
            return res.status(404).json({
                status: false,
                messsage: "User Data Not Found",
            });
        }
        const count = yield ride_model_1.Rides.countDocuments({ rider_id: id });
        const totalCost = yield ride_model_1.Rides.aggregate([
            { $match: { rider_id: id } },
            { $group: { _id: id, totalFare: { $sum: "$fare" } } },
            { $project: { _id: false, totalFare: true } },
        ]);
        return res.json({
            status: true,
            message: "Ride History",
            data: allData,
            meta: {
                count,
                totalCost,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
});
exports.rideControllers = {
    rideRequest,
    rideCancel,
    allRide,
};
