import { SettingsService } from './settings.service';
export declare class SettingsFacade {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    createMeet(meetData: any): Promise<import("./entities/settings.entity").Settings>;
    updateMeet(meetId: any, meetData: any): Promise<import("./entities/settings.entity").Settings>;
    getMeet(userBasicId: string): Promise<import("./entities/settings.entity").Settings>;
}
