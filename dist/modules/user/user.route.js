"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const CheckUserAuth_1 = require("../../middlewares/CheckUserAuth");
const router = (0, express_1.Router)();
router.post("/create-user", user_controller_1.userControllers.createUser);
// update profile
router.put('/update/:id', CheckUserAuth_1.userAuth, user_controller_1.userControllers.updateProfile);
// history 
router.get('/history', CheckUserAuth_1.userAuth, user_controller_1.userControllers.rideHistory);
// ride deatils 
router.get('/ride-details', CheckUserAuth_1.userAuth, user_controller_1.userControllers.rideDetails);
// user role jodi rider hoye toba , request korta parba
// user r role jodi admin role toba block/unblock orta parba
exports.userRoutes = router;
