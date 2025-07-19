import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

const looger = new Logger('Run');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    looger.log(`Running On PORT ${PORT}`);
  });
}
bootstrap();
