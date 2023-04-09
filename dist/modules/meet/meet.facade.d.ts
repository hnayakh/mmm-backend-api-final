import { MeetService } from './meet.service';
export declare class MeetFacade {
    private readonly meetService;
    constructor(meetService: MeetService);
    createMeet(meetData: any): Promise<import("./entities/meet.entity").Meet>;
    updateMeet(meetId: any, meetData: any): Promise<import("./entities/meet.entity").Meet>;
    getMeet(userBasicId: string): Promise<{
        activeSent: import("./entities/meet.entity").Meet[];
        activeconnections: import("./entities/meet.entity").Meet[];
        activeInvites: import("./entities/meet.entity").Meet[];
    } | {
        activeSent?: undefined;
        activeconnections?: undefined;
        activeInvites?: undefined;
    }>;
}
