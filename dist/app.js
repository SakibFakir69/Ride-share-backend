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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json()); // plain text convert to json 
app.use((0, cookie_parser_1.default)());
// cors 
const allowedOrigins = [
    "http://localhost:5173", // local dev
    "https://ride-bha-2-2s04lf3pl-sakibfakirs-projects.vercel.app",
    "https://ride-bhai.netlify.app" // Netlify frontend (if any)
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true); // allow Postman or server requests
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true // important for cookies
}));
// route
app.use('/api/ride-share', routes_1.default);
// test route
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(' server running');
}));
exports.default = app;
// we can this one time in file
