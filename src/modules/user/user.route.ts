import { Router } from "express";
import { userControllers } from "./user.controller";




const router = Router();


router.post('/create-user',userControllers.createUser);


// user role jodi rider hoye toba , request korta parba 
// user r role jodi admin role toba block/unblock orta parba 





export const userRoutes = router;
