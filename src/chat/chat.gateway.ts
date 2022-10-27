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
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('ChatGateway');

  @SubscribeMessage('all_messages')
  public async handleMessage(client: any, payload: any) {
    this.chatService.allMessages(payload);
    this.server.emit('test', 'jhehterhtj');
  }
  @SubscribeMessage('send_message')
  public async handleSendMessage(client: any, payload: any) {
    await this.chatService.sendMessage(payload);
    let my_message = await this.chatService.MyMessage(payload);
    this.server.emit('my_message', my_message);
  }

  public afterInit(server: Server): void {
    return this.logger.log('Init');
  }

  public handleDisconnect(client: Socket): void {
    return this.logger.log(`Client disconnected: ${client.id}`);
  }

  public handleConnection(client: Socket): void {
    return this.logger.log(`Client connected: ${client.id}`);
  }
}
