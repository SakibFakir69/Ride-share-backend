import { Router } from "express";
import { userAuth } from "../../middlewares/CheckUserAuth";
import { userRoleCheck } from "../../middlewares/UserRoleCheck";
import { adminController } from "./admin.controller";




const router = Router();


router.get('/all-driver', userAuth,userRoleCheck.adminCheck , adminController.allDriver);
router.get('/all-ride',userAuth,userRoleCheck.adminCheck ,adminController.allRides )
router.patch('/approve/:id' , userAuth,userRoleCheck.adminCheck , adminController.updateDriverStatus);
router.patch('/account-status',userAuth,userRoleCheck.adminCheck ,adminController.update_Account );