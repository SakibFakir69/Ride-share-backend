import { Router } from "express";
import { userControllers } from "./user.controller";
import { userAuth } from "../../middlewares/CheckUserAuth";


const router = Router();

router.post("/create-user", userControllers.createUser);

// update profile

router.put('/update/:id' ,userAuth, userControllers.updateProfile )

// history 
router.get('/history',userAuth,userControllers.rideHistory)
// ride deatils 
router.get('/ride-details', userAuth, userControllers.rideDetails);


// user role jodi rider hoye toba , request korta parba
// user r role jodi admin role toba block/unblock orta parba

export const userRoutes = router;
