export declare class UserSession {
    private DATE_TIME_FORMAT;
    userBasicId: string;
    lastConnectedTime: string;
    constructor(userBasicId: string);
    IsConnected(): boolean;
}
