import { MeetFacade } from './meet.facade';
export declare class MeetController {
    private readonly meetFacade;
    constructor(meetFacade: MeetFacade);
    createMeet(meetData: object): Promise<{
        data: import("./entities/meet.entity").Meet;
        message: string;
    }>;
    updateMeet(meetId: number, meetData: object): Promise<{
        data: import("./entities/meet.entity").Meet;
        message: string;
    }>;
    getMeet(userBasicId: string): Promise<{
        data: {
            activeSent: import("./entities/meet.entity").Meet[];
            activeconnections: import("./entities/meet.entity").Meet[];
            activeInvites: import("./entities/meet.entity").Meet[];
        } | {
            activeSent?: undefined;
            activeconnections?: undefined;
            activeInvites?: undefined;
        };
        message: string;
    }>;
}
