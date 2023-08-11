import { Module, forwardRef } from '@nestjs/common';
import { ChatGateway } from './gateway';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [ChatGateway],
  // exports: [ChatGateway],
})
export class GatewayModule {}
