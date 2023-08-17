import { UseGuards } from '@nestjs/common';
import {
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDto } from 'src/user/message.dto';
import { ServerToClientEvents } from './event.types';
import { WsJwtGuard } from './ws-jwt/ws-jwt.guard';
import { SocketAuthMiddleWare } from './ws.mw';

@WebSocketGateway()
@UseGuards(WsJwtGuard)
export class ChatGateway implements OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  server: Server<any, ServerToClientEvents>;

  @SubscribeMessage('newMessage')
  onNewMessage(client: Socket, body: { roomName: string; message: string }) {
    const { roomName, message } = body;
    const uniquifiedRoomName = roomName
      .split('-and-')
      .sort((a, b) => (a > b ? 1 : -1))
      .join('-and-');
    console.log(client.rooms);

    this.server.to(uniquifiedRoomName).emit('onMessage', { message });
  }

  @SubscribeMessage('sample')
  sample(client: Server, body: MessageDto) {
    console.log(body);
  }

  @SubscribeMessage('join')
  onJoinMessage(client: Socket, body: any) {
    const { roomName } = body;
    const uniquifiedRoomName = (roomName as string)
      .split('-and-')
      .sort((a, b) => (a > b ? 1 : -1))
      .join('-and-');

    client.join(uniquifiedRoomName);
  }

  async handleConnection(socket: Socket): Promise<void> {
    this.server.to(socket.id).emit('getId', socket.id);
    console.log('Connected!');
  }

  async handleDisconnect(socket: Socket): Promise<void> {
    console.log(`User with id ${socket.id} has disconnected`);
  }

  async afterInit(client: Socket) {
    client.use(SocketAuthMiddleWare() as any);
  }
}
