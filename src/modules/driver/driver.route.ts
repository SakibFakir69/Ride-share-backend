import { Router } from "express";

import { driverController } from "./driver.controller";
import { userAuth } from "../../middlewares/CheckUserAuth";
import { userRoleCheck } from "../../middlewares/UserRoleCheck";

const router = Router();


// driver routes
router.patch('/request',userAuth,userRoleCheck.driverCheck,  driverController.requestPermission)
router.patch('/ride/status', userAuth,userRoleCheck.driverCheck, driverController.rideStatus);
router.get('/earning',userAuth,userRoleCheck.driverCheck, driverController.earningHistory );
router.patch('/online-status', userAuth,userRoleCheck.driverCheck, driverController.onlineStatus);
router.get('/lastest-ride',userAuth,userRoleCheck.driverCheck,driverController.lastestRides)
router.get('/driver/ride-history', userAuth, userRoleCheck.driverCheck,driverController.rideHistory)

export const driverRoutes = router;



