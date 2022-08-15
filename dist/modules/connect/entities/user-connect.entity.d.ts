import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from 'src/modules/user/entities/user-basic.entity';
export declare class UserConnect extends AbstarctEntity {
    connectBalance: number;
    userBasic: UserBasic;
    static createUserConnect(connectBalance: number, userBasic: UserBasic): UserConnect;
    updateUserConnect(conBalance: number, operation: string): void;
}
