import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { useRiderRoute } from "../modules/ride/ride.route";
import { authRoutes } from "../modules/auth/auth.route";

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
        path:"/driver",
        route:useRiderRoute,
    }
]

moduleRoutes.forEach((route)=>{

    router.use(route.path, route.route)

})


export default router;