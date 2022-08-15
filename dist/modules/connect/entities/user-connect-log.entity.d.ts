import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from 'src/modules/user/entities/user-basic.entity';
export declare class UserConnectLog extends AbstarctEntity {
    prevConnectBalance: number;
    currentConnectBalance: number;
    changeAmount: number;
    operation: number;
    reason: string;
    userBasic: UserBasic;
    static createUserConnectLogs(prevConnectBalance: number, currentConnectBalance: number, changeAmount: number, operation: number, reason: string, userBasic: UserBasic): UserConnectLog;
}
