import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
export declare class UserHobbies extends AbstarctEntity {
    hobbies: string;
    profileUpdationStatus: ProfileUpdationStatus;
    userBasic: UserBasic;
    static createUserLifestyle(hobbies: string, userBasic: UserBasic): UserHobbies;
    updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus): this;
}
