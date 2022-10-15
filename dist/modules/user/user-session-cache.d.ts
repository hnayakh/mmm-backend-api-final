import { Cache } from 'cache-manager';
import { UserSession } from './user-session';
export declare class UserSessionCache {
    private cacheManager;
    sessions: any;
    key: string;
    DATE_TIME_FORMAT: string;
    expired_time: number;
    constructor(cacheManager: Cache);
    addOrUpdate(userBasicId: string): Promise<void>;
    private addNewUserSession;
    get(userBasicId: string): Promise<UserSession>;
    getAllActiveUsers(userBasicId: any): Promise<any>;
    getMyOnlineUSers(userBasicId: any): Promise<any>;
    getUserOnlineStatus(userBasicId: any): Promise<{
        userBasicId: any;
        isOnline: boolean;
    }>;
    remove(userBasicId: string): Promise<void>;
}
