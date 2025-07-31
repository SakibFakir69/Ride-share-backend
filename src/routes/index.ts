import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { useRiderRoute } from "../modules/ride/ride.route";
import { authRoutes } from "../modules/auth/auth.route";
import { DriverStatus } from "../modules/user/user.interface";
import { driverRoutes } from "../modules/driver/driver.route";

const router = Router();



const moduleRoutes= [

    {
        path:'/user',
        route:userRoutes,
    },
    {
        path:'/auth',
        route:authRoutes,
    }
    ,
    {
        path:"/ride",
        route:useRiderRoute,
    },
    {
        path:"/drivers",
        route:driverRoutes,
    }
]

moduleRoutes.forEach((route)=>{

    router.use(route.path, route.route)

})


export default router;