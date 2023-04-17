import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
export declare class UserDocs extends AbstarctEntity {
    imageURL: string;
    idProof: string;
    isDefault: boolean;
    profileUpdationStatus: ProfileUpdationStatus;
    userBasic: UserBasic;
    static createUserDocs(imageURL: string, idProof: string, isDefault: boolean, userBasic: UserBasic): UserDocs;
    updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus): this;
}
