import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserMeetStatus } from 'src/shared/enums/miscellaneous.enum';
export declare class Settings extends AbstarctEntity {
    status: UserMeetStatus;
    showPhone: boolean;
    showEmail: boolean;
    isHidden: boolean;
    isNotification: boolean;
    userBasicId: string;
    static createMeet(status: UserMeetStatus, showPhone: boolean, showEmail: boolean, isHidden: boolean, isNotification: boolean, userBasicId: string): Settings;
    updateMeet(status: UserMeetStatus, showPhone: boolean, showEmail: boolean, isHidden: boolean, isNotification: boolean, userBasicId: string): this;
}
