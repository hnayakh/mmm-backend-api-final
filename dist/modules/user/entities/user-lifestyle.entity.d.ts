import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
import { LifestyleOptions } from 'src/shared/enums/user-profile.enum';
export declare class UserLifestyle extends AbstarctEntity {
    lifestyle: LifestyleOptions;
    profileUpdationStatus: ProfileUpdationStatus;
    userBasic: UserBasic;
    static createUserLifestyle(lifestyle: LifestyleOptions, userBasic: UserBasic): UserLifestyle;
    updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus): this;
}
