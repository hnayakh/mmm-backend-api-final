"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRequestState = exports.UserMeetStatus = exports.UserRequestStatus = exports.ModeOfPayment = exports.PaymentStatus = exports.OtpType = exports.AdminRoles = exports.RegistrationSteps = exports.TemplateEnum = exports.DiscountType = exports.LifecycleStatus = exports.ActivationStatus = exports.ProfileUpdationStatus = void 0;
var ProfileUpdationStatus;
(function (ProfileUpdationStatus) {
    ProfileUpdationStatus[ProfileUpdationStatus["Current"] = 0] = "Current";
    ProfileUpdationStatus[ProfileUpdationStatus["Pending"] = 1] = "Pending";
    ProfileUpdationStatus[ProfileUpdationStatus["Archived"] = 2] = "Archived";
})(ProfileUpdationStatus = exports.ProfileUpdationStatus || (exports.ProfileUpdationStatus = {}));
var ActivationStatus;
(function (ActivationStatus) {
    ActivationStatus[ActivationStatus["Pending"] = 0] = "Pending";
    ActivationStatus[ActivationStatus["Verified"] = 1] = "Verified";
    ActivationStatus[ActivationStatus["Rejected"] = 2] = "Rejected";
})(ActivationStatus = exports.ActivationStatus || (exports.ActivationStatus = {}));
var LifecycleStatus;
(function (LifecycleStatus) {
    LifecycleStatus[LifecycleStatus["Active"] = 0] = "Active";
    LifecycleStatus[LifecycleStatus["Blocked"] = 1] = "Blocked";
})(LifecycleStatus = exports.LifecycleStatus || (exports.LifecycleStatus = {}));
var DiscountType;
(function (DiscountType) {
    DiscountType[DiscountType["Percentage"] = 0] = "Percentage";
    DiscountType[DiscountType["Amount"] = 1] = "Amount";
})(DiscountType = exports.DiscountType || (exports.DiscountType = {}));
var TemplateEnum;
(function (TemplateEnum) {
    TemplateEnum[TemplateEnum["email"] = 0] = "email";
    TemplateEnum[TemplateEnum["sms"] = 1] = "sms";
    TemplateEnum[TemplateEnum["PopUp"] = 3] = "PopUp";
})(TemplateEnum = exports.TemplateEnum || (exports.TemplateEnum = {}));
var RegistrationSteps;
(function (RegistrationSteps) {
    RegistrationSteps[RegistrationSteps["Basic"] = 1] = "Basic";
    RegistrationSteps[RegistrationSteps["About"] = 2] = "About";
    RegistrationSteps[RegistrationSteps["Religion"] = 3] = "Religion";
    RegistrationSteps[RegistrationSteps["Career"] = 4] = "Career";
    RegistrationSteps[RegistrationSteps["FamilyBackground"] = 5] = "FamilyBackground";
    RegistrationSteps[RegistrationSteps["FamilyDetail"] = 6] = "FamilyDetail";
    RegistrationSteps[RegistrationSteps["Habit"] = 7] = "Habit";
    RegistrationSteps[RegistrationSteps["BioWithImages"] = 8] = "BioWithImages";
    RegistrationSteps[RegistrationSteps["PendingVerification"] = 9] = "PendingVerification";
    RegistrationSteps[RegistrationSteps["Completed"] = 10] = "Completed";
    RegistrationSteps[RegistrationSteps["Preferences"] = 11] = "Preferences";
})(RegistrationSteps = exports.RegistrationSteps || (exports.RegistrationSteps = {}));
var AdminRoles;
(function (AdminRoles) {
    AdminRoles[AdminRoles["SuperAdmin"] = 0] = "SuperAdmin";
    AdminRoles[AdminRoles["Admin"] = 1] = "Admin";
    AdminRoles[AdminRoles["SupportTeamL3"] = 2] = "SupportTeamL3";
    AdminRoles[AdminRoles["SupportTeamL2"] = 3] = "SupportTeamL2";
    AdminRoles[AdminRoles["SupportTeamL1"] = 4] = "SupportTeamL1";
})(AdminRoles = exports.AdminRoles || (exports.AdminRoles = {}));
var OtpType;
(function (OtpType) {
    OtpType[OtpType["Registration"] = 0] = "Registration";
    OtpType[OtpType["Login"] = 1] = "Login";
    OtpType[OtpType["ForgotPassword"] = 2] = "ForgotPassword";
})(OtpType = exports.OtpType || (exports.OtpType = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus[PaymentStatus["Success"] = 0] = "Success";
    PaymentStatus[PaymentStatus["Failed"] = 1] = "Failed";
    PaymentStatus[PaymentStatus["Pending"] = 2] = "Pending";
})(PaymentStatus = exports.PaymentStatus || (exports.PaymentStatus = {}));
var ModeOfPayment;
(function (ModeOfPayment) {
})(ModeOfPayment = exports.ModeOfPayment || (exports.ModeOfPayment = {}));
var UserRequestStatus;
(function (UserRequestStatus) {
    UserRequestStatus[UserRequestStatus["Pending"] = 0] = "Pending";
    UserRequestStatus[UserRequestStatus["Accepted"] = 1] = "Accepted";
    UserRequestStatus[UserRequestStatus["Rejected"] = 2] = "Rejected";
    UserRequestStatus[UserRequestStatus["Reverted"] = 3] = "Reverted";
})(UserRequestStatus = exports.UserRequestStatus || (exports.UserRequestStatus = {}));
var UserMeetStatus;
(function (UserMeetStatus) {
    UserMeetStatus[UserMeetStatus["Pending"] = 0] = "Pending";
    UserMeetStatus[UserMeetStatus["Accepted"] = 1] = "Accepted";
    UserMeetStatus[UserMeetStatus["Rejected"] = 2] = "Rejected";
    UserMeetStatus[UserMeetStatus["Reverted"] = 3] = "Reverted";
})(UserMeetStatus = exports.UserMeetStatus || (exports.UserMeetStatus = {}));
var UserRequestState;
(function (UserRequestState) {
    UserRequestState[UserRequestState["Active"] = 0] = "Active";
    UserRequestState[UserRequestState["RemovedByRequestingUser"] = 1] = "RemovedByRequestingUser";
    UserRequestState[UserRequestState["RemovedByRequestedUser"] = 2] = "RemovedByRequestedUser";
    UserRequestState[UserRequestState["NotConnected"] = 3] = "NotConnected";
})(UserRequestState = exports.UserRequestState || (exports.UserRequestState = {}));
//# sourceMappingURL=miscellaneous.enum.js.map