import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from 'src/modules/user/entities/user-basic.entity';

@Entity('user_connect_logs')
export class UserConnectLog extends AbstarctEntity {
  @Column()
  prevConnectBalance: number;

  @Column()
  currentConnectBalance: number;

  @Column()
  changeAmount: number;

  @Column()
  operation: number; // Add = 1, Remove = 2

  @Column()
  reason: string;

  @ManyToOne((type) => UserBasic, (userBasic) => userBasic.userConnectLogs)
  userBasic: UserBasic;

  static createUserConnectLogs(
    prevConnectBalance: number,
    currentConnectBalance: number,
    changeAmount: number,
    operation: number,
    reason: string,
    userBasic: UserBasic,
  ) {
    const userConnectLogs = new UserConnectLog();
    userConnectLogs.prevConnectBalance = prevConnectBalance;
    userConnectLogs.currentConnectBalance = currentConnectBalance;
    userConnectLogs.changeAmount = changeAmount;
    userConnectLogs.operation = operation;
    userConnectLogs.reason = reason;
    userConnectLogs.userBasic = userBasic;
    return userConnectLogs;
  }
}
