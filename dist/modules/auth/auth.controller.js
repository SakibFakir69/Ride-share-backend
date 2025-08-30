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
exports.authController = void 0;
const user_model_1 = require("../user/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const setCookies_1 = require("../../utils/setCookies");
const logINUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // clear cookies
    const { email, password } = req.body;
    const isUserxits = yield user_model_1.User.findOne({ email: email });
    if (!isUserxits) {
        res.status(404).json({
            status: false,
            message: "User Not founded",
        });
    }
    const isHaspassword = bcryptjs_1.default.compare(isUserxits === null || isUserxits === void 0 ? void 0 : isUserxits.password, password);
    if (!isHaspassword) {
        res.status(400).json({
            status: false,
            message: "Password Not Match",
        });
    }
    // genrate token
    const payload = {
        id: isUserxits === null || isUserxits === void 0 ? void 0 : isUserxits._id,
        email: isUserxits === null || isUserxits === void 0 ? void 0 : isUserxits.email,
        role: isUserxits === null || isUserxits === void 0 ? void 0 : isUserxits.role,
        password: isUserxits === null || isUserxits === void 0 ? void 0 : isUserxits.password,
    };
    console.log(payload, " auth payload ");
    const accessToken = jsonwebtoken_1.default.sign({ payload }, "secrect_key", {
        expiresIn: "1d",
    });
    const refreshToken = jsonwebtoken_1.default.sign({ payload }, "refresh_key", {
        expiresIn: "1d",
    });
    const token = {
        accessToken,
        refreshToken,
    };
    console.log(token, " auth token ");
    (0, setCookies_1.setAuthCookie)(res, token);
    /// res.cookies("acces".{});
    console.log("set cookies");
    res.status(201).json({
        status: true,
        message: "User Login Successfull and Token Created",
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
    });
});
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        console.log(user, " user ");
        if (!user) {
            return res
                .status(401)
                .json({ status: false, message: "User unAuthorize" });
        }
        const userInfo = yield user_model_1.User.findById(user === null || user === void 0 ? void 0 : user.id);
        return res.status(200).json({
            status: true,
            message: "User info fetch successfully",
            data: userInfo,
        });
    }
    catch (error) {
        console.log(error);
    }
});
// logout
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        return res.status(200).json({
            status: true,
            message: "Log out successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: "Faild to logout"
        });
    }
});
exports.authController = {
    logINUser,
    getMe, logoutUser,
};
