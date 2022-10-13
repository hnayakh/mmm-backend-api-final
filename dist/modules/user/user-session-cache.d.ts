import { Cache } from 'cache-manager';
import { UserSession } from './user-session';
export declare class UserSessionCache {
    private cacheManager;
    sessions: any;
    key: string;
    DATE_TIME_FORMAT: string;
    expired_time: number;
    constructor(cacheManager: Cache);
    addOrUpdate(userName: string): Promise<void>;
    private addNewUserSession;
    get(userName: string): Promise<UserSession>;
    getAllActive(): Promise<UserSession[]>;
    remove(userName: string): Promise<void>;
}
