import { Router } from "express";
import { userAuth } from "../../middlewares/CheckUserAuth";
import { userRoleCheck } from "../../middlewares/UserRoleCheck";
import { adminController } from "./admin.controller";




const router = Router();


router.get('/all-driver', userAuth,userRoleCheck.adminCheck , adminController.allDriver);
router.get('/all-ride',userAuth,userRoleCheck.adminCheck ,adminController.allRides );
router.get('/all-users', userAuth,userRoleCheck.adminCheck, adminController.allUser)



router.patch('/drivers/approve/:id' , userAuth,userRoleCheck.adminCheck , adminController.updateDriverStatus);
router.patch('/block/:id',userAuth,userRoleCheck.adminCheck ,adminController.update_Account );

export const useAdminRouter = router;
