"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.post("/create-user", user_controller_1.userControllers.createUser);
// user role jodi rider hoye toba , request korta parba
// user r role jodi admin role toba block/unblock orta parba
exports.userRoutes = router;
