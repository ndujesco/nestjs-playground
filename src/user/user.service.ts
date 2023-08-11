import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { MessageDto } from './message.dto';
import { ChatGateway } from 'src/gateway/gateway';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => ChatGateway))
    private chatGateWay: ChatGateway,
  ) {}

  generateJwt(payload): string {
    return this.jwtService.sign(payload, { secret: 'penny and dime.' });
  }

  async signIn(user) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (!userExists) {
      return this.registerUser(user);
    }

    return this.generateJwt({
      sub: userExists.id,
      email: userExists.email,
    });

    // const
  }

  async registerUser(user) {
    return;
  }

  async sendMessage(messageDto: MessageDto) {
    const { senderId, text, receiverId, socketId } = messageDto;
    const uniquifiedRoomName = `${senderId} ${receiverId}`
      .split(' ')
      .sort((a, b) => (a > b ? 1 : -1))
      .join('-and-');

    this.chatGateWay.server.in(socketId).socketsJoin(uniquifiedRoomName);
    this.chatGateWay.server
      .to(uniquifiedRoomName)
      .except(socketId)
      .emit('newMessage', { text });

    return { text, uniquifiedRoomName };
  }
}
