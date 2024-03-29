import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
export declare class UserLifestyle extends AbstarctEntity {
    lifestyle: string;
    profileUpdationStatus: ProfileUpdationStatus;
    userBasic: UserBasic;
    static createUserLifestyle(lifestyle: string, userBasic: UserBasic): UserLifestyle;
    updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus): this;
}
