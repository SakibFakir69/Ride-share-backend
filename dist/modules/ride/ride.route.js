"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRiderRoute = void 0;
const express_1 = require("express");
const CheckUserAuth_1 = require("../../middlewares/CheckUserAuth");
const UserRoleCheck_1 = require("../../middlewares/UserRoleCheck");
const ride_controller_1 = require("./ride.controller");
const router = (0, express_1.Router)();
// ride request
router.post("/request", CheckUserAuth_1.userAuth, UserRoleCheck_1.userRoleCheck.riderCheck, ride_controller_1.rideControllers.rideRequest);
router.patch('/:id/status', CheckUserAuth_1.userAuth, UserRoleCheck_1.userRoleCheck.riderCheck, ride_controller_1.rideControllers.rideCancel);
router.get('/me', CheckUserAuth_1.userAuth, UserRoleCheck_1.userRoleCheck.riderCheck, ride_controller_1.rideControllers.allRide);
exports.useRiderRoute = router;
