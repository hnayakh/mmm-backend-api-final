import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserConnectDurationLog } from './user-connect-duration-log';
export declare class UserConnectDuration extends AbstarctEntity {
    userOneBasicId: string;
    userTwoBasicId: string;
    usedDuration: number;
    totalDuration: number;
    isFirstTime: boolean;
    userConnectDurationLogs: UserConnectDurationLog[];
    static createUserConnectDuration(userOneBasicId: string, userTwoBasicId: string, usedDuration: number, totalDuration: number, isFirstTime: boolean): UserConnectDuration;
    updateUserConnectDuration(prevUsedDuration: number, usedDuration: number): this;
}
