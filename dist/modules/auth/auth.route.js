"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const CheckUserAuth_1 = require("../../middlewares/CheckUserAuth");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post('/login-user', auth_controller_1.authController.logINUser);
router.get('/me', CheckUserAuth_1.userAuth, auth_controller_1.authController.getMe);
router.post('/log-out', auth_controller_1.authController.logoutUser);
// user role jodi rider hoye toba , request korta parba
// user r role jodi admin role toba block/unblock orta parba
exports.authRoutes = router;
