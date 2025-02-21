import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatMessage } from 'src/types/message.type';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: ChatMessage): void {
    this.server.emit('message', message);
  }

  afterInit() {
    console.log('ChatGateway Initialized');
  }
}
