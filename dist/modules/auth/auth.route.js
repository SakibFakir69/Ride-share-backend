"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post('/login-user', auth_controller_1.authController.logINUser);
// user role jodi rider hoye toba , request korta parba
// user r role jodi admin role toba block/unblock orta parba
exports.authRoutes = router;
