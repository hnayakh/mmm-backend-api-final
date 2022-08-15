import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserConnectDurationLog } from './user-connect-duration-log';

@Entity('user_connect_durations')
export class UserConnectDuration extends AbstarctEntity {
    @Column()
    userOneBasicId: string;
  
    @Column()
    userTwoBasicId: string;

    @Column()
    usedDuration: number;

    @Column()
    totalDuration: number;

    @Column()
    isFirstTime: boolean;

    @OneToMany((type) => UserConnectDurationLog, (userConnectDurationLogs) => userConnectDurationLogs.userConnectDuration)
    userConnectDurationLogs: UserConnectDurationLog[];

  static createUserConnectDuration(userOneBasicId: string,
    userTwoBasicId: string,
    usedDuration: number,
    totalDuration: number,
    isFirstTime: boolean
    ) {
    const userConnectDuration = new UserConnectDuration();
    userConnectDuration.userTwoBasicId = userTwoBasicId;
    userConnectDuration.userOneBasicId = userOneBasicId;
    userConnectDuration.usedDuration = usedDuration;
    userConnectDuration.totalDuration = totalDuration;
    userConnectDuration.isFirstTime = isFirstTime;
    return userConnectDuration;
  }

  updateUserConnectDuration(prevUsedDuration: number, usedDuration: number) {
    this.usedDuration = prevUsedDuration + usedDuration;
    return this;
  }
}
