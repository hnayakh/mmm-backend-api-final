import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { UserRepo } from './modules/user/user.repo';
import { UserSessionCache } from './modules/user/user-session-cache';

@WebSocketGateway({ cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private userSessionCache: UserSessionCache) {}
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('AppGateway');
  private userRepo: UserRepo;
  @SubscribeMessage('allOnlineUsers')
  public async checkOnlineUser(client: Socket, userBasicId: string) {
    this.logger.log('allOnlineUsers', userBasicId);
    this.userSessionCache.addOrUpdate(userBasicId);
    let activeUsers = await this.userSessionCache.getAllActiveUsers(
      userBasicId,
    );
    console.log('activeUsers', activeUsers);
    let respObj = {
      status: 200,
      message: 'Online Members',
      data: activeUsers,
      type: 'SUCCESS',
    };
    this.server.emit('all_online_users_list', respObj);
  }
  
  @SubscribeMessage('onlineUsers')
  public async checkMyOnlineUser(client: Socket, userBasicId: string) {
    this.logger.log('onlineUsers', userBasicId);
    console.log('userBasicId',userBasicId)
    this.userSessionCache.addOrUpdate(userBasicId);
    let activeUsers = await this.userSessionCache.getMyOnlineUSers(userBasicId);
    console.log('activeUsers', activeUsers);
    let respObj = {
      status: 200,
      message: 'Online Members',
      data: activeUsers,
      type: 'SUCCESS',
    };
    this.server.emit('online_users_list', respObj);
  }


  @SubscribeMessage('userOnlineStatus')
  public async checkAuserOnlineStatus(client: Socket, userBasicId: string) {
    this.logger.log('userOnlineStatus', userBasicId);
    this.userSessionCache.addOrUpdate(userBasicId);
    let activeUsers = await this.userSessionCache.getUserOnlineStatus(userBasicId);
    console.log('activeUsers', activeUsers);
    let respObj = {
      status: 200,
      message: 'Online Members',
      data: activeUsers,
      type: 'SUCCESS',
    };
    this.server.emit('online_users_status', respObj);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
