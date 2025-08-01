import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { useRiderRoute } from "../modules/ride/ride.route";
import { authRoutes } from "../modules/auth/auth.route";

import { driverRoutes } from "../modules/driver/driver.route";
import { useAdminRouter } from "../modules/admin/admin.route";

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
    },
    {
        path:"/admin",
        route:useAdminRouter,

    }
]

moduleRoutes.forEach((route)=>{

    router.use(route.path, route.route)

})


export default router;