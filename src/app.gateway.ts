import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ cors: true })
export class AppGateway {
  @WebSocketServer()
  server;
  @SubscribeMessage('onlineUsers')
  handleMessage(client: any, payload: any): any {
    // return 'Hello world!';
    this.server.emit('check_online', payload);
  }
}
