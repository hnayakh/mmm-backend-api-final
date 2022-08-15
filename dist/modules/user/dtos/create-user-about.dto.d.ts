import { AbilityStatus, ChildrenStatus, MaritalStatus, NumberOfChildren } from 'src/shared/enums/user-profile.enum';
export declare class CreateUserAboutDto {
    userBasicId: string;
    name: string;
    dateOfBirth: string;
    maritalStatus: MaritalStatus;
    childrenStatus: ChildrenStatus;
    abilityStatus: AbilityStatus;
    height: number;
    numberOfChildren: NumberOfChildren;
}
