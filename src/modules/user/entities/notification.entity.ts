import { Column, Entity } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { NotificationStatus } from 'src/shared/enums/user-profile.enum';
// import { add } from 'date-fns';

@Entity('notifications')
export class Notification extends AbstarctEntity {
  @Column({ nullable: true })
  senderId: string;

  @Column({ nullable: true })
  receiverId: string;

  @Column({})
  message: string;

  @Column({})
  header: string;

  @Column({})
  image: string;

  @Column({ default: NotificationStatus.missed })
  status: NotificationStatus;

  @Column({ type: 'timestamp' })
  duration: string;

  static createNotification(
    senderId: string,
    receiverId: string,
    message: string,
  ) {
    const notificationObj = new Notification();
    notificationObj.senderId = senderId;
    notificationObj.message = message;
    notificationObj.receiverId = receiverId;
    return notificationObj;
  }
}
