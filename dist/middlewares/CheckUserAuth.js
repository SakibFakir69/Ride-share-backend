"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userAuth = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token, " token");
    if (!token) {
        res.status(401).json({
            status: false,
            message: "Token required",
        });
    }
    try {
        const decodeToken = jsonwebtoken_1.default.verify(token, "secrect_key");
        req.user = decodeToken.payload;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Forbidden: Invalid or expired token",
        });
    }
};
exports.userAuth = userAuth;
