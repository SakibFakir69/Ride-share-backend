"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const ride_route_1 = require("../modules/ride/ride.route");
const auth_route_1 = require("../modules/auth/auth.route");
const driver_route_1 = require("../modules/driver/driver.route");
const admin_route_1 = require("../modules/admin/admin.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/user',
        route: user_route_1.userRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.authRoutes,
    },
    {
        path: "/ride",
        route: ride_route_1.useRiderRoute,
    },
    {
        path: "/drivers",
        route: driver_route_1.driverRoutes,
    },
    {
        path: "/admin",
        route: admin_route_1.useAdminRouter,
    }
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
