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
    static createMeet(lat: number, status: UserMeetStatus, long: number, requestedId: string, requestingId: string, link: string, scheduleTime: string, address: string, type: string): Meet;
    updateMeet(lat: number, status: UserMeetStatus, long: number, requestedId: string, requestingId: string, link: string, scheduleTime: string, address: string, type: string): this;
}
