"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnvVariable = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loadEnvVariable = () => {
    const requiredEnv = ["NODE_ENV", "MONGODB_URL", "PORT"];
    requiredEnv.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Missing env  ${key}`);
        }
    });
    return {
        PORT: process.env.PORT,
        MONGODB_URL: process.env.MONGODB_URL,
        NODE_ENV: process.env.NODE_ENV,
    };
};
exports.loadEnvVariable = loadEnvVariable;
