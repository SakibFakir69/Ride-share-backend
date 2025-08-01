"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverRoutes = void 0;
const express_1 = require("express");
const driver_controller_1 = require("./driver.controller");
const CheckUserAuth_1 = require("../../middlewares/CheckUserAuth");
const UserRoleCheck_1 = require("../../middlewares/UserRoleCheck");
const router = (0, express_1.Router)();
// driver routes
router.patch('/request', CheckUserAuth_1.userAuth, UserRoleCheck_1.userRoleCheck.driverCheck, driver_controller_1.driverController.requestPermission);
router.patch('/ride/status', CheckUserAuth_1.userAuth, UserRoleCheck_1.userRoleCheck.driverCheck, driver_controller_1.driverController.rideStatus);
router.get('/earning', CheckUserAuth_1.userAuth, UserRoleCheck_1.userRoleCheck.driverCheck, driver_controller_1.driverController.earningHistory);
router.patch('/online-status', CheckUserAuth_1.userAuth, UserRoleCheck_1.userRoleCheck.driverCheck, driver_controller_1.driverController.onlineStatus);
exports.driverRoutes = router;
