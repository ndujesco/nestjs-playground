import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
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

  async test() {
    return this.generateJwt({ id: 1 });
  }

  async registerUser(user) {
    return;
  }
}
