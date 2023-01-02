import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { NotificationStatus } from 'src/shared/enums/user-profile.enum';
export declare class Notification extends AbstarctEntity {
    senderId: string;
    receiverId: string;
    message: string;
    status: NotificationStatus;
    duration: string;
    static createNotification(senderId: string, receiverId: string, message: string): Notification;
}
