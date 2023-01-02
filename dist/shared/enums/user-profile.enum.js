"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnualIncome = exports.NumberOfChildren = exports.Manglik = exports.MotherOccupation = exports.FatherOccupation = exports.FamilyAfluenceLevel = exports.FamilyValues = exports.FamilyType = exports.DrinkingHabit = exports.SmokingHabit = exports.NotificationStatus = exports.EatingHabit = exports.ChildrenStatus = exports.AbilityStatus = exports.MaritalStatus = exports.Relationship = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
    Gender[Gender["Other"] = 2] = "Other";
})(Gender = exports.Gender || (exports.Gender = {}));
var Relationship;
(function (Relationship) {
    Relationship[Relationship["Self"] = 0] = "Self";
    Relationship[Relationship["Son"] = 1] = "Son";
    Relationship[Relationship["Daughter"] = 2] = "Daughter";
    Relationship[Relationship["Sister"] = 3] = "Sister";
    Relationship[Relationship["Brother"] = 4] = "Brother";
})(Relationship = exports.Relationship || (exports.Relationship = {}));
var MaritalStatus;
(function (MaritalStatus) {
    MaritalStatus[MaritalStatus["NeverMarried"] = 0] = "NeverMarried";
    MaritalStatus[MaritalStatus["Divorced"] = 1] = "Divorced";
    MaritalStatus[MaritalStatus["Widowed"] = 2] = "Widowed";
    MaritalStatus[MaritalStatus["AwaitingDivorce"] = 3] = "AwaitingDivorce";
})(MaritalStatus = exports.MaritalStatus || (exports.MaritalStatus = {}));
var AbilityStatus;
(function (AbilityStatus) {
    AbilityStatus[AbilityStatus["Normal"] = 0] = "Normal";
    AbilityStatus[AbilityStatus["PhysicallyChallenged"] = 1] = "PhysicallyChallenged";
})(AbilityStatus = exports.AbilityStatus || (exports.AbilityStatus = {}));
var ChildrenStatus;
(function (ChildrenStatus) {
    ChildrenStatus[ChildrenStatus["No"] = 0] = "No";
    ChildrenStatus[ChildrenStatus["YesLivingTogether"] = 1] = "YesLivingTogether";
    ChildrenStatus[ChildrenStatus["YesNotLivingTogether"] = 2] = "YesNotLivingTogether";
})(ChildrenStatus = exports.ChildrenStatus || (exports.ChildrenStatus = {}));
var EatingHabit;
(function (EatingHabit) {
    EatingHabit[EatingHabit["Vegetarrian"] = 0] = "Vegetarrian";
    EatingHabit[EatingHabit["Eggitarrian"] = 1] = "Eggitarrian";
    EatingHabit[EatingHabit["Nonvegetarrian"] = 2] = "Nonvegetarrian";
})(EatingHabit = exports.EatingHabit || (exports.EatingHabit = {}));
var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus[NotificationStatus["missed"] = 0] = "missed";
    NotificationStatus[NotificationStatus["accepted"] = 1] = "accepted";
    NotificationStatus[NotificationStatus["rejected"] = 3] = "rejected";
    NotificationStatus[NotificationStatus["completed"] = 4] = "completed";
    NotificationStatus[NotificationStatus["cancel"] = 5] = "cancel";
})(NotificationStatus = exports.NotificationStatus || (exports.NotificationStatus = {}));
var SmokingHabit;
(function (SmokingHabit) {
    SmokingHabit[SmokingHabit["Smoker"] = 0] = "Smoker";
    SmokingHabit[SmokingHabit["NonSmoker"] = 1] = "NonSmoker";
    SmokingHabit[SmokingHabit["Occasionally"] = 2] = "Occasionally";
})(SmokingHabit = exports.SmokingHabit || (exports.SmokingHabit = {}));
var DrinkingHabit;
(function (DrinkingHabit) {
    DrinkingHabit[DrinkingHabit["Alcoholic"] = 0] = "Alcoholic";
    DrinkingHabit[DrinkingHabit["Nonalcoholic"] = 1] = "Nonalcoholic";
    DrinkingHabit[DrinkingHabit["Occasionally"] = 2] = "Occasionally";
})(DrinkingHabit = exports.DrinkingHabit || (exports.DrinkingHabit = {}));
var FamilyType;
(function (FamilyType) {
    FamilyType[FamilyType["Nuclear"] = 0] = "Nuclear";
    FamilyType[FamilyType["Joint"] = 1] = "Joint";
    FamilyType[FamilyType["Other"] = 2] = "Other";
})(FamilyType = exports.FamilyType || (exports.FamilyType = {}));
var FamilyValues;
(function (FamilyValues) {
    FamilyValues[FamilyValues["Traditional"] = 0] = "Traditional";
    FamilyValues[FamilyValues["Moderate"] = 1] = "Moderate";
    FamilyValues[FamilyValues["Liberal"] = 2] = "Liberal";
})(FamilyValues = exports.FamilyValues || (exports.FamilyValues = {}));
var FamilyAfluenceLevel;
(function (FamilyAfluenceLevel) {
    FamilyAfluenceLevel[FamilyAfluenceLevel["Rich"] = 0] = "Rich";
    FamilyAfluenceLevel[FamilyAfluenceLevel["UpperMiddleClass"] = 1] = "UpperMiddleClass";
    FamilyAfluenceLevel[FamilyAfluenceLevel["MiddleClass"] = 2] = "MiddleClass";
    FamilyAfluenceLevel[FamilyAfluenceLevel["LowerMiddleClass"] = 3] = "LowerMiddleClass";
})(FamilyAfluenceLevel = exports.FamilyAfluenceLevel || (exports.FamilyAfluenceLevel = {}));
var FatherOccupation;
(function (FatherOccupation) {
    FatherOccupation[FatherOccupation["Employed"] = 0] = "Employed";
    FatherOccupation[FatherOccupation["Business"] = 1] = "Business";
    FatherOccupation[FatherOccupation["Retired"] = 2] = "Retired";
    FatherOccupation[FatherOccupation["NotEmployed"] = 3] = "NotEmployed";
    FatherOccupation[FatherOccupation["PassedAway"] = 4] = "PassedAway";
})(FatherOccupation = exports.FatherOccupation || (exports.FatherOccupation = {}));
var MotherOccupation;
(function (MotherOccupation) {
    MotherOccupation[MotherOccupation["HomeMaker"] = 0] = "HomeMaker";
    MotherOccupation[MotherOccupation["Employed"] = 1] = "Employed";
    MotherOccupation[MotherOccupation["Business"] = 2] = "Business";
    MotherOccupation[MotherOccupation["Retired"] = 3] = "Retired";
    MotherOccupation[MotherOccupation["PassedAway"] = 4] = "PassedAway";
})(MotherOccupation = exports.MotherOccupation || (exports.MotherOccupation = {}));
var Manglik;
(function (Manglik) {
    Manglik[Manglik["Yes"] = 0] = "Yes";
    Manglik[Manglik["No"] = 1] = "No";
    Manglik[Manglik["NotApplicable"] = 2] = "NotApplicable";
})(Manglik = exports.Manglik || (exports.Manglik = {}));
var NumberOfChildren;
(function (NumberOfChildren) {
    NumberOfChildren[NumberOfChildren["One"] = 0] = "One";
    NumberOfChildren[NumberOfChildren["Two"] = 1] = "Two";
    NumberOfChildren[NumberOfChildren["ThreeOrMore"] = 2] = "ThreeOrMore";
})(NumberOfChildren = exports.NumberOfChildren || (exports.NumberOfChildren = {}));
var AnualIncome;
(function (AnualIncome) {
    AnualIncome[AnualIncome["LessThanOneLacs"] = 0] = "LessThanOneLacs";
    AnualIncome[AnualIncome["OneToThreeLacs"] = 1] = "OneToThreeLacs";
    AnualIncome[AnualIncome["ThreeToFiveLacs"] = 2] = "ThreeToFiveLacs";
    AnualIncome[AnualIncome["FiveToSevenLacs"] = 3] = "FiveToSevenLacs";
    AnualIncome[AnualIncome["SevenToTenLacs"] = 4] = "SevenToTenLacs";
    AnualIncome[AnualIncome["TenToTwelveLacs"] = 5] = "TenToTwelveLacs";
    AnualIncome[AnualIncome["MoreThanTwelveLacs"] = 6] = "MoreThanTwelveLacs";
})(AnualIncome = exports.AnualIncome || (exports.AnualIncome = {}));
//# sourceMappingURL=user-profile.enum.js.map