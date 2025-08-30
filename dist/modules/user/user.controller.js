"use strict";
// error catch
// all env one folder
// server
// eslint
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const zod_1 = require("zod");
const user_model_1 = require("./user.model");
const user_interface_1 = require("./user.interface");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const ride_model_1 = require("../ride/ride.model");
// user create
const userZodValidationTest = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.email().includes("@"),
    password: zod_1.z.string().min(6),
    phone: zod_1.z.number().optional(),
    role: zod_1.z.enum(Object.values(user_interface_1.Role)).default(user_interface_1.Role.RIDER).optional(),
    availability_status: zod_1.z
        .enum(Object.values(user_interface_1.AvailabilityStatus))
        .default(user_interface_1.AvailabilityStatus.ONLINE),
    account_status: zod_1.z
        .enum(Object.values(user_interface_1.AccountStatus))
        .default(user_interface_1.AccountStatus.UNBLOCK),
    driver_status: zod_1.z
        .enum(Object.values(user_interface_1.DriverStatus))
        .default(user_interface_1.DriverStatus.NONE),
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // haspassword ,
    // role
    // global error
    // complete user , driver
    try {
        const result = userZodValidationTest.parse(req.body);
        // already check account
        const isUserxits = yield user_model_1.User.findOne({ email: result.email });
        if (isUserxits) {
            res.status(400).json({
                status: false,
                message: "User Already Exits",
            });
        }
        if (!result) {
            res.status(404).json({
                status: false,
                message: "faild to info validation",
            });
        }
        const hashPassword = yield bcryptjs_1.default.hash(result.password, 10);
        const newUser = Object.assign(Object.assign({}, result), { password: hashPassword });
        const user = yield user_model_1.User.create(newUser);
        res.status(201).json({
            status: true,
            message: "User Created Successfully!",
            data: user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Faild To Create User",
            error: error.message,
        });
    }
});
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(404).json({
                status: false,
                message: "user not founed"
            });
        }
        const userId = req === null || req === void 0 ? void 0 : req.user.id;
        const data = yield user_model_1.User.findById(userId);
        // check condition 
        if ((data === null || data === void 0 ? void 0 : data.account) === "BLOCK" || (data === null || data === void 0 ? void 0 : data.account) === "SUSPEND") {
            return res.status(400).json({
                status: false,
                message: "You can not update profile"
            });
        }
        const updateUser = yield user_model_1.User.findByIdAndUpdate(userId, req.body, { new: true });
        return res.status(200).json({
            status: true,
            message: "User update succesfully",
            data: updateUser,
        });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: "failded to user update",
            error: error.stack
        });
    }
});
// ride history 
// const rideHistory = async(request:AuthRequest, response:Response)=>{
//   try {
//     const userId = request?.user?.id;
//     const page =Number(request.query.page) || 1;
//     const limit = Number(request.query.limit )|| 10;
//     const sortBy = request.query.sortBy || "ASC"
//     const search = request.query.search as string;
//     const fare = request.query.fare ;
//     const destination = request.query.destination;
//     console.log(page, limit, search)
//     const filter :any= {rider_id:userId};
//     if(search)
//     {
//       filter.$or=[
//         {destination:{$regex:
//           search
//         }, $options:"i"},
//         {fare:{$regex:search},$options:"i"}
//       ]
//     }
//     // order 
//     let order:number = request.query.sortBy==='asc' ? 1 : -1;
//     const rideHistory = await Rides.find({rider_id:userId}).sort({createdAt:order}).skip((page-1)*limit).limit(limit);
//     const totalDocument = await Rides.countDocuments();
//     if(!rideHistory){
//       return response.status(404).json({
//         status:false,
//         message:"No Ride Founded"
//       })
//     }
//     return response.json({
//       status:true,
//       message:"Ride History Fetched Succesfully",
//       data:rideHistory , 
//       meta:{
//         total:Math.ceil(totalDocument/limit),
//         page,
//         limit,
//       }
//     })
//   } catch (error:any) {
//     return response.status(500).json({
//       status:false,
//       message:"Failed to data fetch",
//       error:error.stack
//     })
//   }
// }
const rideHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId)
            return res.status(401).json({ status: false, message: "Unauthorized" });
        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        // Search & filters
        const search = req.query.search || "";
        const status = req.query.status;
        const minFare = req.query.minFare ? Number(req.query.minFare) : undefined;
        const maxFare = req.query.maxFare ? Number(req.query.maxFare) : undefined;
        const startDate = req.query.startDate ? new Date(req.query.startDate) : undefined;
        const endDate = req.query.endDate ? new Date(req.query.endDate) : undefined;
        // Sorting
        const sortBy = ((_b = req.query.sortBy) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || "desc";
        const order = sortBy === "asc" ? "asc" : "desc";
        // Build filter
        let filter = { rider_id: userId };
        // Search by string fields and fare
        if (search) {
            const fareSearch = isNaN(Number(search)) ? undefined : Number(search);
            filter.$or = [
                { current: { $regex: search, $options: "i" } },
                { destination: { $regex: search, $options: "i" } },
                { payment_status: { $regex: search, $options: "i" } },
                { rider_status: { $regex: search, $options: "i" } },
                ...(fareSearch !== undefined ? [{ fare: fareSearch }] : []),
            ];
        }
        // Status filter
        if (status)
            filter.rider_status = status;
        // Fare range
        if (minFare !== undefined || maxFare !== undefined) {
            filter.fare = {};
            if (minFare !== undefined)
                filter.fare.$gte = minFare;
            if (maxFare !== undefined)
                filter.fare.$lte = maxFare;
        }
        // Date range
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate)
                filter.createdAt.$gte = startDate;
            if (endDate)
                filter.createdAt.$lte = endDate;
        }
        // Query database
        const rides = yield ride_model_1.Rides.find(filter)
            .sort({ createdAt: order })
            .skip((page - 1) * limit)
            .limit(limit);
        const totalDocs = yield ride_model_1.Rides.countDocuments(filter);
        if (rides.length === 0) {
            return res.status(404).json({ status: false, message: "No rides found" });
        }
        return res.json({
            status: true,
            message: "Ride history fetched successfully",
            data: rides,
            meta: {
                totalDocs,
                totalPages: Math.ceil(totalDocs / limit),
                page,
                limit,
            },
        });
    }
    catch (error) {
        return res.status(500).json({ status: false, message: "Failed to fetch ride history", error: error.message });
    }
});
exports.default = rideHistory;
const rideDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const data = yield ride_model_1.Rides.find({ rider_id: userId });
        if (!data) {
            return res.status(400).json({
                status: false,
                message: "Data not founed"
            });
        }
        return res.status(200).json({
            status: true,
            message: "Data Fetched Succesfully",
            data: data,
            meta: {
                totalRide: data.length,
            }
        });
    }
    catch (error) {
    }
});
// 
exports.userControllers = {
    createUser, updateProfile, rideHistory, rideDetails
};
