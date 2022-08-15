import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
import { AbilityStatus, ChildrenStatus, MaritalStatus, NumberOfChildren } from 'src/shared/enums/user-profile.enum';
export declare class UserAbout extends AbstarctEntity {
    name: string;
    dateOfBirth: string;
    maritalStatus: MaritalStatus;
    childrenStatus: ChildrenStatus;
    numberOfChildren: NumberOfChildren;
    abilityStatus: AbilityStatus;
    profileUpdationStatus: ProfileUpdationStatus;
    height: number;
    userBasic: UserBasic;
    static createUserAbout(name: string, dateOfBirth: string, maritalStatus: MaritalStatus, childrenStatus: ChildrenStatus, abilityStatus: AbilityStatus, height: number, userBasic: UserBasic, numberOfChildren: NumberOfChildren): UserAbout;
    updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus): this;
}
