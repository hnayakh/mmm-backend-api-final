import { Repository } from 'typeorm';
import { Settings } from './entities/settings.entity';
import { SettingsRepo } from './settings.repo';
import { UserService } from '../user/user.service';
export declare class SettingsService {
    private readonly meetRepo;
    private readonly userService;
    private readonly meet;
    constructor(meetRepo: SettingsRepo, userService: UserService, meet: Repository<Settings>);
    createMeet(settingObj: any): Promise<Settings>;
    updateMeet(meetId: any, settingObj: any): Promise<Settings>;
    getMeet(userBasicId: string): Promise<Settings>;
}
