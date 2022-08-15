import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserConnectDuration } from './user-connect-duration.entity';

@Entity('user_connect_duration_logs')
export class UserConnectDurationLog extends AbstarctEntity {

    @Column()
    usedDuration: number;

    @ManyToOne((type) => UserConnectDuration, (userConnectDuration) => userConnectDuration.userConnectDurationLogs)
    userConnectDuration: UserConnectDuration;

    static createUserConnectDurationLogs(usedDuration: number, userConnectDuration: UserConnectDuration) {
        const userConnectDurationLog = new UserConnectDurationLog();
        userConnectDurationLog.usedDuration = usedDuration;
        userConnectDurationLog.userConnectDuration = userConnectDuration;
        return userConnectDurationLog;
    }
}
