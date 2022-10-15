import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UserSessionCache } from './modules/user/user-session-cache';
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private userSessionCache;
    constructor(userSessionCache: UserSessionCache);
    server: Server;
    private logger;
    private userRepo;
    checkOnlineUser(client: Socket, userBasicId: string): Promise<void>;
    checkMyOnlineUser(client: Socket, userBasicId: string): Promise<void>;
    checkAuserOnlineStatus(client: Socket, userBasicId: string): Promise<void>;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
}
