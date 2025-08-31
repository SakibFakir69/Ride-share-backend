
import {  Router } from "express";
import { userAuth } from "../../middlewares/CheckUserAuth";
import { userRoleCheck } from "../../middlewares/UserRoleCheck";
import { rideControllers } from "./ride.controller";
const router = Router();

// ride request
router.post(
  "/request",
    userAuth,
  userRoleCheck.riderCheck,
  rideControllers.rideRequest
);

router.patch('/:id/status',userAuth,userRoleCheck.riderCheck,rideControllers.rideCancel)

router.get('/me',userAuth , userRoleCheck.riderCheck,rideControllers.allRide);
router.patch('/payment', userAuth, userRoleCheck.riderCheck, rideControllers.payment);

export const useRiderRoute = router;
