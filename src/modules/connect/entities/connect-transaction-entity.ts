import { UserBasic } from "src/modules/user/entities/user-basic.entity";
import { AbstarctEntity } from "src/shared/entities/abstract.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('connect_transaction_log')
export class ConnectTransactionEntity extends AbstarctEntity {
    @ManyToOne((type) => UserBasic, (userBasic) => userBasic.connectTransaction)
    userBasic: UserBasic;
    @Column({ name: 'operation', nullable: false })
    operation: number;

    @Column({ name: 'external_id', nullable: true })
    externalId: string;

    static create(userBasic: UserBasic, operation: number, externalId?: string) {
        const obj = new ConnectTransactionEntity();
        obj.userBasic = userBasic;
        obj.operation = operation;
        obj.externalId = externalId;
        obj.isActive=true
        return obj;
    }
}