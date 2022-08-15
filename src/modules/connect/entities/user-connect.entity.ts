import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
import { UserBasic } from 'src/modules/user/entities/user-basic.entity';

@Entity('user_connects')
export class UserConnect extends AbstarctEntity {
  @Column()
  connectBalance: number;

  @ManyToOne((type) => UserBasic, (userBasic) => userBasic.userConnects)
  userBasic: UserBasic;

  static createUserConnect(connectBalance: number, userBasic: UserBasic) {
    const userConnect = new UserConnect();
    userConnect.connectBalance = connectBalance;
    userConnect.userBasic = userBasic;
    return userConnect;
  }

  updateUserConnect(conBalance: number, operation : string) {
    this.connectBalance = operation == 'add' ? this.connectBalance + conBalance : this.connectBalance - conBalance;
  }
}
