import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: 'penny and dime',
      signOptions: {
        expiresIn: '100d',
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtService, GoogleStrategy],
})
export class UserModule {}
