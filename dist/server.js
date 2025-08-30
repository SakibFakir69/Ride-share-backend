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
exports.io = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const PORT = (0, env_1.loadEnvVariable)().PORT;
const DB_URL = (0, env_1.loadEnvVariable)().MONGODB_URL;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app_1.default);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', "POST"]
    }
});
(function (url) {
    return __awaiter(this, void 0, void 0, function* () {
        // recive parameter as url
        try {
            yield mongoose_1.default.connect(url);
            console.log("DB CONNECTED");
            server.listen(PORT, () => {
                console.log(`server runing on this port ${PORT}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
})(DB_URL);
// pass argument as ur
// 
