"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.DriverStatus = exports.Account_status = exports.AccountStatus = exports.AvailabilityStatus = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["RIDER"] = "RIDER";
    Role["DRIVER"] = "DRIVER";
})(Role || (exports.Role = Role = {}));
var AvailabilityStatus;
(function (AvailabilityStatus) {
    AvailabilityStatus["OFFLINE"] = "OFFLINE";
    AvailabilityStatus["ONLINE"] = "ONLINE";
})(AvailabilityStatus || (exports.AvailabilityStatus = AvailabilityStatus = {}));
var AccountStatus;
(function (AccountStatus) {
    AccountStatus["BLOCK"] = "BLOCK";
    AccountStatus["UNBLOCK"] = "UNBLOCK";
    AccountStatus["APPROVED"] = "APPROVED";
    AccountStatus["SUSPEND"] = "SUSPEND";
})(AccountStatus || (exports.AccountStatus = AccountStatus = {}));
var Account_status;
(function (Account_status) {
    Account_status["APPROVED"] = "APPROVED";
    Account_status["SUSPEND"] = "SUSPEND";
    Account_status["BLOCK"] = "BLOCK";
    Account_status["UNBLOCK"] = "UNBLOCK";
})(Account_status || (exports.Account_status = Account_status = {}));
var DriverStatus;
(function (DriverStatus) {
    DriverStatus["REJECT"] = "REJECT";
    DriverStatus["ACCEPT"] = "ACCEPT";
    DriverStatus["PENDING"] = "PENDING";
    DriverStatus["NONE"] = "NONE";
})(DriverStatus || (exports.DriverStatus = DriverStatus = {}));
var Status;
(function (Status) {
})(Status || (exports.Status = Status = {}));
