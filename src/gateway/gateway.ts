import { Inject, Injectable, forwardRef } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDto } from 'src/user/message.dto';
import { UserService } from 'src/user/user.service';
import { ServerToClientEvents } from './event.types';

@Injectable()
@WebSocketGateway()
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server<any, ServerToClientEvents>;

  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  @SubscribeMessage('newMessage')
  onNewMessage(client: Server, body: { roomName: string; message: string }) {
    const { roomName, message } = body;
    const uniquifiedRoomName = roomName
      .split('-and-')
      .sort((a, b) => (a > b ? 1 : -1))
      .join('-and-');

    this.server.to(uniquifiedRoomName).emit('newMessage', { message });
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

    Array.from(client.rooms)
      .filter((it) => it !== client.id)
      .forEach((room) => {
        client.leave(room);
        client.removeAllListeners('newMessage');
      });
    client.join(uniquifiedRoomName);
    console.log(client.rooms);
  }

  async handleConnection(socket: Socket): Promise<void> {
    this.server.to(socket.id).emit('getId', socket.id);
  }

  async handleDisconnect(socket: Socket): Promise<void> {
    console.log(`User with id ${socket.id} has disconnected`);
  }

  async afterInit(client: Socket) {
    console.log('afterInit');
  }
}
