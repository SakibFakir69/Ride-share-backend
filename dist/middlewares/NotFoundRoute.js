"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundRoute = void 0;
const notFoundRoute = (req, res, next) => {
    res.status(404).json({
        status: false,
        messsage: `${req.url} This Route Not Founded`
    });
    next();
};
exports.notFoundRoute = notFoundRoute;
