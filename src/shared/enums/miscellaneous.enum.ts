export enum ProfileUpdationStatus {
  Current = 0,
  Pending = 1,
  Archived = 2,
}

export enum ActivationStatus {
  Pending = 0,
  Verified = 1,
  Rejected = 2,
}

export enum LifecycleStatus {
  Active = 0,
  Blocked = 1,
}

export enum DiscountType {
  Percentage = 0,
  Amount = 1,
}

export enum RegistrationSteps {
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
  Preferences = 11, // This came later. After 7 the step would go to 11. From there to 9.
}

export enum AdminRoles {
  SuperAdmin = 0,
  Admin = 1,
  SupportTeamL3 = 2,
  SupportTeamL2 = 3,
  SupportTeamL1 = 4,
}

export enum OtpType {
  Registration = 0,
  Login = 1,
  ForgotPassword = 2,
}

export enum PaymentStatus {
  Success = 0,
  Failed = 1,
  Pending = 2,
}

export enum ModeOfPayment {}

export enum UserRequestStatus {
  Pending = 0,
  Accepted = 1,
  Rejected = 2,
  Reverted = 3,
}

export enum UserRequestState {
  Active = 0,
  RemovedByRequestingUser = 1,
  RemovedByRequestedUser = 2,
  NotConnected = 3,
}
