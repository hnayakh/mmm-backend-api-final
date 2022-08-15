import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
export declare class UserBio extends AbstarctEntity {
    aboutMe: string;
    profileUpdationStatus: ProfileUpdationStatus;
    userBasic: UserBasic;
    static createUserBio(aboutMe: string, userBasic: UserBasic): UserBio;
    updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus): this;
}
