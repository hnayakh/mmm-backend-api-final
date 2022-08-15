export declare enum ProfileUpdationStatus {
    Current = 0,
    Pending = 1,
    Archived = 2
}
export declare enum ActivationStatus {
    Pending = 0,
    Verified = 1,
    Rejected = 2
}
export declare enum LifecycleStatus {
    Active = 0,
    Blocked = 1
}
export declare enum DiscountType {
    Percentage = 0,
    Amount = 1
}
export declare enum RegistrationSteps {
    Basic = 1,
    About = 2,
    Habit = 3,
    Religion = 4,
    Career = 5,
    FamilyBackground = 6,
    FamilyDetail = 7,
    BioWithImages = 8,
    PendingVerification = 9,
    Completed = 10,
    Preferences = 11
}
export declare enum AdminRoles {
    SuperAdmin = 0,
    Admin = 1,
    SupportTeamL3 = 2,
    SupportTeamL2 = 3,
    SupportTeamL1 = 4
}
export declare enum OtpType {
    Registration = 0,
    Login = 1,
    ForgotPassword = 2
}
export declare enum PaymentStatus {
    Success = 0,
    Failed = 1,
    Pending = 2
}
export declare enum ModeOfPayment {
}
export declare enum UserRequestStatus {
    Pending = 0,
    Accepted = 1,
    Rejected = 2,
    Reverted = 3
}
export declare enum UserRequestState {
    Active = 0,
    RemovedByRequestingUser = 1,
    RemovedByRequestedUser = 2,
    NotConnected = 3
}
