import { Router } from "express";
import { userAuth } from "../../middlewares/CheckUserAuth";
import { userRoleCheck } from "../../middlewares/UserRoleCheck";
import { adminController } from "./admin.controller";




const router = Router();


router.get('/all-driver', userAuth,userRoleCheck.adminCheck , adminController.allDriver);
router.get('/all-ride',userAuth,userRoleCheck.adminCheck ,adminController.allRides );
router.get('/find/all-user', userAuth,userRoleCheck.adminCheck, adminController.allUser)

router.patch('/drivers/approve/:id' , userAuth,userRoleCheck.adminCheck , adminController.updateDriverStatus);

router.patch('/block/:id',userAuth,userRoleCheck.adminCheck ,adminController.update_Account );
router.get('/count', userAuth, userRoleCheck.adminCheck, adminController.totalDetails)
// dashboard
router.get('/driver-activity' , userAuth,userRoleCheck.adminCheck, adminController.driverActivity);
router.get('/ride-trend' , userAuth,userRoleCheck.adminCheck, adminController.revenuTrend);
router.get('/ride-voloum' , userAuth,userRoleCheck.adminCheck, adminController.rideVolume);
export const useAdminRouter = router;
