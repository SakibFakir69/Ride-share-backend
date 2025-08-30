"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAdminRouter = void 0;
const express_1 = require("express");
const CheckUserAuth_1 = require("../../middlewares/CheckUserAuth");
const UserRoleCheck_1 = require("../../middlewares/UserRoleCheck");
const admin_controller_1 = require("./admin.controller");
const router = (0, express_1.Router)();
router.get('/all-driver', CheckUserAuth_1.userAuth, UserRoleCheck_1.userRoleCheck.adminCheck, admin_controller_1.adminController.allDriver);
router.get('/all-ride', CheckUserAuth_1.userAuth, UserRoleCheck_1.userRoleCheck.adminCheck, admin_controller_1.adminController.allRides);
router.get('/find/all-user', CheckUserAuth_1.userAuth, UserRoleCheck_1.userRoleCheck.adminCheck, admin_controller_1.adminController.allUser);
router.patch('/drivers/approve/:id', CheckUserAuth_1.userAuth, UserRoleCheck_1.userRoleCheck.adminCheck, admin_controller_1.adminController.updateDriverStatus);
router.patch('/block/:id', CheckUserAuth_1.userAuth, UserRoleCheck_1.userRoleCheck.adminCheck, admin_controller_1.adminController.update_Account);
router.get('/count', CheckUserAuth_1.userAuth, UserRoleCheck_1.userRoleCheck.adminCheck, admin_controller_1.adminController.totalDetails);
// dashboard
router.get('/driver-activity', CheckUserAuth_1.userAuth, UserRoleCheck_1.userRoleCheck.adminCheck, admin_controller_1.adminController.driverActivity);
router.get('/ride-trend', CheckUserAuth_1.userAuth, UserRoleCheck_1.userRoleCheck.adminCheck, admin_controller_1.adminController.revenuTrend);
router.get('/ride-voloum', CheckUserAuth_1.userAuth, UserRoleCheck_1.userRoleCheck.adminCheck, admin_controller_1.adminController.rideVolume);
exports.useAdminRouter = router;
