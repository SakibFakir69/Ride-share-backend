"use strict";
// ja ride request diba tr collection id
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverStatus = exports.RideStatus = exports.PaymentStatus = exports.VehicleType = void 0;
var VehicleType;
(function (VehicleType) {
    VehicleType["CAR"] = "CAR";
    VehicleType["BIKE"] = "BIKE";
    VehicleType["SCOOTER"] = "SCOOTER";
    VehicleType["CNG"] = "CNG";
    VehicleType["OTHER"] = "OTHER";
})(VehicleType || (exports.VehicleType = VehicleType = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PAID"] = "PAID";
    PaymentStatus["UNPAID"] = "UNPAID";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var RideStatus;
(function (RideStatus) {
    RideStatus["REQUESTED"] = "REQUESTED";
    RideStatus["ACCEPTED"] = "ACCEPTED";
    RideStatus["CANCELLED"] = "CANCELLED";
    RideStatus["PICKED_UP"] = "PICKED_UP";
    RideStatus["IN_TRANSIT"] = "IN_TRANSIT";
    RideStatus["COMPLETED"] = "COMPLETED";
    RideStatus["PENDING"] = "PENDING";
})(RideStatus || (exports.RideStatus = RideStatus = {}));
var DriverStatus;
(function (DriverStatus) {
    DriverStatus["REJECT"] = "REJECT";
    DriverStatus["ACCEPT"] = "ACCEPT";
    DriverStatus["PENDING"] = "PENDING";
    DriverStatus["NONE"] = "NONE";
})(DriverStatus || (exports.DriverStatus = DriverStatus = {}));
