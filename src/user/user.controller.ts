import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GoogleOauthGuard } from './guards/google-oauth-guard';

@Controller('auth')
export class UserController {
  constructor(private authService: UserService) {}

  @Get('/test')
  async test() {
    return { accessToken: await this.authService.test() };
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth() {
    return true;
  }

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  googleAuthCallback(@Req() req, @Res() res: Response) {
    console.log(req.user);
    return res.json();

    // return { user: req.user };
    // const token = await this.authService.signIn(req.user);
  }
}
