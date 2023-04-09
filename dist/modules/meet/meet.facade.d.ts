import { MeetService } from './meet.service';
export declare class MeetFacade {
    private readonly meetService;
    constructor(meetService: MeetService);
    createMeet(meetData: any): Promise<import("./entities/meet.entity").Meet>;
    updateMeet(meetId: any, meetData: any): Promise<import("./entities/meet.entity").Meet>;
    getMeet(): Promise<void>;
}
