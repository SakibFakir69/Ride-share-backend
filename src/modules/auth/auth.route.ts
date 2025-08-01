



import { Router } from "express";


import { authController } from "./auth.controller";
const router = Router();

router.post('/login-user',authController.logINUser );



// user role jodi rider hoye toba , request korta parba
// user r role jodi admin role toba block/unblock orta parba

export const authRoutes = router;
