



import { Router } from "express";
import { userAuth } from "../../middlewares/CheckUserAuth";

import { authController } from "./auth.controller";
const router = Router();

router.post('/login-user',authController.logINUser );
router.get('/me',userAuth,authController.getMe)
router.post('/log-out',authController.logoutUser);
router.post('/new-password',authController.createNewPassword)

// user role jodi rider hoye toba , request korta parba
// user r role jodi admin role toba block/unblock orta parba

export const authRoutes = router;
