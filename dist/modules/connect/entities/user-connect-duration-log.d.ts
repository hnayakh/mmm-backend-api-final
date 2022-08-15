import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserConnectDuration } from './user-connect-duration.entity';
export declare class UserConnectDurationLog extends AbstarctEntity {
    usedDuration: number;
    userConnectDuration: UserConnectDuration;
    static createUserConnectDurationLogs(usedDuration: number, userConnectDuration: UserConnectDuration): UserConnectDurationLog;
}
