import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
export declare class UserImage extends AbstarctEntity {
    imageURL: string;
    thumbnailURL: string;
    isDefault: boolean;
    profileUpdationStatus: ProfileUpdationStatus;
    userBasic: UserBasic;
    static createUserImage(imageURL: string, isDefault: boolean, userBasic: UserBasic): UserImage;
    updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus): this;
}
