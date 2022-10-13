export declare class UserSession {
    private DATE_TIME_FORMAT;
    userName: string;
    lastConnectedTime: string;
    constructor(userName: string);
    IsConnected(): boolean;
}
