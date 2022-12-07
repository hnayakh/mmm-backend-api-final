import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
export declare class UserBio extends AbstarctEntity {
    aboutMe: string;
    idProof: string;
    profileUpdationStatus: ProfileUpdationStatus;
    userBasic: UserBasic;
    static createUserBio(aboutMe: string, userBasic: UserBasic): UserBio;
    static createUserDocBio(idProof: string): UserBio;
    updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus): this;
}
