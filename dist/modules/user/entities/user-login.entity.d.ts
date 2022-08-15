import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
export declare class UserLogin extends AbstarctEntity {
    deviceType: string;
    deviceId: string;
    authToken: string;
    userBasic: UserBasic;
    static createUserLoginRecord(deviceType: string, deviceId: string, authToken: string, userBasic: UserBasic): UserLogin;
    deactivate(): this;
}
