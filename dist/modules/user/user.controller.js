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
exports.userControllers = {
    createUser,
};
