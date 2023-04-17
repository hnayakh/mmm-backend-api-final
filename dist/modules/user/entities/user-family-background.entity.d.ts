import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
import { FamilyAfluenceLevel, FamilyType, FamilyValues } from 'src/shared/enums/user-profile.enum';
export declare class UserFamilyBackground extends AbstarctEntity {
    familyStatus: FamilyAfluenceLevel;
    familyValues: FamilyValues;
    familyType: FamilyType;
    country: number;
    state: number;
    city: number;
    isResidingWithFamily: number;
    profileUpdationStatus: ProfileUpdationStatus;
    userBasic: UserBasic;
    static createUserFamilyBackground(familyStatus: FamilyAfluenceLevel, familyValues: FamilyValues, familyType: FamilyType, country: number, isResidingWithFamily: number, state: number, city: number, userBasic: UserBasic): UserFamilyBackground;
    updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus): this;
}
