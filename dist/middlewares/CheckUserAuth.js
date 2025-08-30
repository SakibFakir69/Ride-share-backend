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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = req.headers.authorization ||
            req.cookies.accessToken ||
            ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]);
        console.log("Cookies received:", req.cookies);
        console.log(token, " token aklnsdlk;ans");
        console.log(token, " token");
        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Token required",
            });
        }
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
});
exports.userAuth = userAuth;
