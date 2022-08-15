import { UserBasic } from "src/modules/user/entities/user-basic.entity";
import { AbstarctEntity } from "src/shared/entities/abstract.entity";
export declare class ConnectTransactionEntity extends AbstarctEntity {
    userBasic: UserBasic;
    operation: number;
    externalId: string;
    static create(userBasic: UserBasic, operation: number, externalId?: string): ConnectTransactionEntity;
}
