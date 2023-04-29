import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserMeetStatus } from 'src/shared/enums/miscellaneous.enum';
export declare class Meet extends AbstarctEntity {
    status: UserMeetStatus;
    lat: number;
    long: number;
    type: string;
    requestedId: string;
    requestingId: string;
    link: string;
    scheduleTime: string;
    address: string;
    static createMeet(status: UserMeetStatus, long: number, lat: number, requestedId: string, requestingId: string, link: string, scheduleTime: string, address: string, type: string): Meet;
    updateMeet(status: UserMeetStatus, long: number, lat: number, requestedId: string, requestingId: string, link: string, scheduleTime: string, address: string, type: string): this;
}
