import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GoogleOauthGuard } from './guards/google-oauth-guard';
import { MessageDto } from './message.dto';

@Controller()
export class UserController {
  constructor(private authService: UserService) {}

  @Post('/send-message')
  async message(@Body() messageDto: MessageDto) {
    return this.authService.sendMessage(messageDto);
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
