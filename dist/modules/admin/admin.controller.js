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
exports.adminController = exports.allDriver = void 0;
const user_interface_1 = require("../user/user.interface");
const user_model_1 = require("../user/user.model");
const ride_model_1 = require("../ride/ride.model");
// get all driver
// export const allDriver = async (req: Request, res: Response) => {
//   try {
//     // Get query params
//     const search = req.query.search as string;
// const availability_status = req.query.availability_status as string;
// const account_status = req.query.account_status as string; // ✅ fix this
//     //  drivers object , here we can add more object and search from here
//     const query: any = { role: Role.DRIVER };
//     console.log(search, "djfoksdnfl");
//     console.log(availability_status, "av");
//     console.log(account_status, "acc");
//     // Add availability filter if provided
//     if (availability_status) {
//       query.availability_status = availability_status;
//       // if true add to object
//     }
//     // Add account status filter if provided
//     if (account_status) {
//       query.account_status= account_status;
//       // if true add to object
//     }
//     if (search) {
//       const terms = search.split(" ");
//       console.log(terms, " terms");
//       // ["John", "Doe"]
//       query.$and = terms.map((term) => ({
//         $or: [
//           { name: { $regex: term, $options: "i" } },
//           { email: { $regex: term, $options: "i" } },
//         ],
//       }));
//     }
//     // Fetch data from MongoDB
//     const allData = await User.find(query);
//     if (allData.length === 0) {
//       return res.status(404).json({
//         status: false,
//         message: "No drivers found",
//       });
//     }
//     return res.status(200).json({
//       status: true,
//       message: "All driver data fetched",
//       data: allData,
//     });
//   } catch (error: any) {
//     console.error(error);
//     return res.status(500).json({
//       status: false,
//       message: error.message,
//       error: error.stack,
//     });
//   }
// };
const allDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get query params and normalize
        let { search, availability_status, account_status } = req.query;
        const query = { role: user_interface_1.Role.DRIVER };
        // Clean up params
        if (availability_status)
            availability_status = availability_status.toString().trim().toUpperCase();
        if (account_status)
            account_status = account_status.toString().trim().toUpperCase();
        if (search)
            search = search.toString().trim();
        // Apply filters
        if (availability_status)
            query.availability_status = availability_status;
        if (account_status)
            query.account_status = account_status;
        // Flexible search
        if (search) {
            const terms = search
                .split(" ")
                .map((t) => t.trim())
                .filter(Boolean);
            query.$and = terms.map((term) => ({
                $or: [
                    { name: { $regex: term, $options: "i" } },
                    { email: { $regex: term, $options: "i" } },
                ],
            }));
        }
        // Fetch from DB
        const allData = yield user_model_1.User.find(query);
        if (!allData || allData.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No drivers found",
                query,
            });
        }
        return res.status(200).json({
            status: true,
            message: "All driver data fetched",
            data: allData,
            query,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error.message,
            error: error.stack,
        });
    }
});
exports.allDriver = allDriver;
// Get all users (riders)
const allUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, account } = req.query;
        console.log(search, account);
        const query = { role: user_interface_1.Role.RIDER };
        if (account) {
            query.account = account;
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ];
        }
        const allData = yield user_model_1.User.find(query);
        if (allData.length === 0) {
            return res.status(400).json({
                status: false,
                message: "No riders found",
                query: query,
            });
        }
        return res.status(200).json({
            status: true,
            message: "All rider data fetched",
            data: allData,
            query: query,
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
        const { createdAt, isCompleteRide, ride_status } = req.query;
        const query = {};
        if (isCompleteRide !== undefined) {
            query.isCompleteRide = isCompleteRide === "true"; // cast string to boolean
        }
        console.log({ createdAt, isCompleteRide, ride_status });
        if (createdAt) {
            query.createdAt = {
                $gte: new Date(createdAt),
            };
        }
        const allRide = yield ride_model_1.Rides.find(query)
            .populate("driver_id", "name email")
            .populate("rider_id", "name email")
            .sort({ createdAt: -1 }); // newest first
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
                message: "Enter User Id",
            });
        }
        if (!account_status) {
            return res.status(404).json({
                status: false,
                message: "Enter your status",
            });
        }
        const userupdateStatus = yield user_model_1.User.findByIdAndUpdate(userId, { account_status: account_status }, {
            new: true,
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
            message: error.message,
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
                message: "Enter User Id",
            });
        }
        if (!account) {
            return res.status(404).json({
                status: false,
                message: "Enter your status",
            });
        }
        const userupdateStatus = yield user_model_1.User.findByIdAndUpdate(userId, { account: account }, {
            new: true,
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
            message: error.message,
        });
    }
});
// driver count , user count 
// total revenue , ride voloum
const totalDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const riderCount = yield user_model_1.User.aggregate([
            { $match: { role: user_interface_1.Role.RIDER
                } },
            // find all rider account 
            { $group: { _id: null, totalRider: { $sum: 1 } } },
        ]);
        // total driver
        const driverCount = yield user_model_1.User.aggregate([
            { $match: { role: user_interface_1.Role.DRIVER } },
            { $group: { _id: null, totalDriver: { $sum: 1 } } },
        ]);
        return res.status(200).json({
            status: true,
            message: "Successfully data fetched",
            rider: ((_a = riderCount[0]) === null || _a === void 0 ? void 0 : _a.totalRider) || 0,
            driver: ((_b = driverCount[0]) === null || _b === void 0 ? void 0 : _b.totalDriver) || 0,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: `${error.message}`,
            error: error.stack
        });
    }
});
// rider voloum 
const rideVolume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // kon month koto rider hoyeca tai bar korta hobba 
        const rideStats = yield ride_model_1.Rides.aggregate([
            { $group: { _id: { $month: "$createdAt" }, totalRide: { $sum: 1 } } },
            { $sort: { "_id": 1 } }
        ]);
        return res.status(200).json({
            status: true,
            message: "Successfully fetched data",
            totalVoloum: rideStats,
        });
    }
    catch (error) {
    }
});
const revenuTrend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const revenueStats = yield ride_model_1.Rides.aggregate([
            { $group: { _id: { $month: "$createdAt" }, totalRevenue: { $sum: "$fare" } } },
            { $sort: { "_id": 1 } }
        ]);
        return res.status(200).json({
            status: true,
            message: "Successfully fetched revenue data",
            revenue: revenueStats,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            error: error.stack
        });
    }
});
const driverActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stats = yield ride_model_1.Rides.aggregate([
            {
                $group: {
                    _id: "$driver_id", // group by driver
                    totalRides: { $sum: 1 } // count rides
                }
            },
            { $sort: { totalRides: -1 } }, // most active first
            { $limit: 10 } // top 10 drivers
        ]);
        res.status(200).json({
            status: true,
            message: "Fetched driver activity",
            activity: stats,
        });
    }
    catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});
exports.adminController = {
    allDriver: exports.allDriver,
    allUser,
    allRides,
    updateDriverStatus,
    update_Account,
    totalDetails,
    driverActivity,
    rideVolume,
    revenuTrend
};
