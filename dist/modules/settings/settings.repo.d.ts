import { Settings } from './entities/settings.entity';
import { Repository } from 'typeorm';
export declare class SettingsRepo {
    private readonly meet;
    constructor(meet: Repository<Settings>);
    getMeetRequestByUserId(userBasicId: string): Promise<Settings[]>;
    getActiveSentRequest(userBasicId: string): Promise<Settings[]>;
    getActiveInvites(userBasicId: string): Promise<Settings[]>;
    getActiveConnections(userBasicId: string): Promise<Settings[]>;
    getActiveSentConnections(userBasicId: string): Promise<Settings[]>;
}
