import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
import { Manglik } from 'src/shared/enums/user-profile.enum';
export declare class UserReligion extends AbstarctEntity {
    religion: string;
    cast: string;
    gothra: string;
    motherTongue: string;
    isManglik: Manglik;
    profileUpdationStatus: ProfileUpdationStatus;
    userBasic: UserBasic;
    static createUserReligion(religion: string, cast: string, gothra: string, motherTongue: string, isManglik: Manglik, userBasic: UserBasic): UserReligion;
    updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus): this;
}
