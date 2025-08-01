"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoleCheck = void 0;
const user_interface_1 = require("../modules/user/user.interface");
const riderCheck = (req, res, next) => {
    const user = req.user;
    console.log(user, " user");
    if (!user) {
        return res.status(401).json({
            status: false,
            message: "Unauthorized: No user info found.",
        });
    }
    if ((user === null || user === void 0 ? void 0 : user.role) !== user_interface_1.Role.RIDER) {
        return res.status(401).json({
            status: false,
            message: "Access denied: Only riders can access this route.",
        });
    }
    if ((user === null || user === void 0 ? void 0 : user.account_status) === user_interface_1.AccountStatus.BLOCK) {
        return res.status(401).json({
            status: false,
            message: "Your account is blocked. Please contact support.",
        });
    }
    next();
};
// driver check
const driverCheck = (req, res, next) => {
    const user = req.user;
    console.log(user, " user");
    if (!user) {
        return res.status(401).json({
            status: false,
            message: "Unauthorized: No user info found.",
        });
    }
    if ((user === null || user === void 0 ? void 0 : user.role) !== user_interface_1.Role.DRIVER) {
        return res.status(401).json({
            status: false,
            message: "Access denied: Only Driver can access this route.",
        });
    }
    if ((user === null || user === void 0 ? void 0 : user.account_status) === user_interface_1.AccountStatus.BLOCK) {
        return res.status(401).json({
            status: false,
            message: "Your account is blocked. Please contact support.",
        });
    }
    next();
};
// admin check
const adminCheck = (req, res, next) => {
    const user = req.user;
    console.log(user, " user");
    if (!user) {
        return res.status(401).json({
            status: false,
            message: "Unauthorized: No user info found.",
        });
    }
    if ((user === null || user === void 0 ? void 0 : user.role) !== user_interface_1.Role.ADMIN) {
        return res.status(401).json({
            status: false,
            message: "Access denied: Only Admin can access this route.",
        });
    }
    next();
};
exports.userRoleCheck = {
    riderCheck, driverCheck, adminCheck
};
