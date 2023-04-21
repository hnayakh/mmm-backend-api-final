import { SettingsFacade } from './settings.facade';
export declare class SettingsController {
    private readonly meetFacade;
    constructor(meetFacade: SettingsFacade);
    createMeet(meetData: object): Promise<{
        data: import("./entities/settings.entity").Settings;
        message: string;
    }>;
    updateMeet(meetId: number, meetData: object): Promise<{
        data: import("./entities/settings.entity").Settings;
        message: string;
    }>;
    getMeet(userBasicId: string): Promise<{
        data: import("./entities/settings.entity").Settings;
        message: string;
    }>;
}
