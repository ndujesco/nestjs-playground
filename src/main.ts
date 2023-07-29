import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('MAIN');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  const port = process.env.port || 3000;
  await app.listen(port);
  logger.verbose(`E DEH RUSH\nCheck it out on http://localhost:${port}/`);
}
bootstrap();
