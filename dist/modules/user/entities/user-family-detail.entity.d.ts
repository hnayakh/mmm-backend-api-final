import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
import { FatherOccupation, MotherOccupation } from 'src/shared/enums/user-profile.enum';
export declare class UserFamilyDetail extends AbstarctEntity {
    fatherOccupation: FatherOccupation;
    motherOccupation: MotherOccupation;
    numberOfBrothers: number;
    marriedNumberOfBrothers: number;
    numberOfSisters: number;
    marriedNumberOfSisters: number;
    profileUpdationStatus: ProfileUpdationStatus;
    userBasic: UserBasic;
    static createUserFamilyDetail(fatherOccupation: FatherOccupation, motherOccupation: MotherOccupation, numberOfBrothers: number, marriedNumberOfBrothers: number, numberOfSisters: number, marriedNumberOfSisters: number, userBasic: UserBasic): UserFamilyDetail;
    updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus): this;
}
