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
    getMeet(): Promise<{
        data: void;
        message: string;
    }>;
}
