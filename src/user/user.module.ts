import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { GoogleStrategy } from './strategy/google.strategy';
import { GatewayModule } from 'src/gateway/gateway.module';
import { ChatGateway } from 'src/gateway/gateway';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: 'penny and dime',
      signOptions: {
        expiresIn: '100d',
      },
    }),
    GatewayModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    GoogleStrategy,
    ChatGateway,
    JwtService,
  ],
})
export class UserModule {}
