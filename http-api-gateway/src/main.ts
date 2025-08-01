import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceExceptionFilter } from './common/filters/Microservice-exception.filter';
import { sessionMiddleware } from './common/middleware/exp_ses.middleware';

const looger = new Logger('Run');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  });
  app.useGlobalFilters(new MicroserviceExceptionFilter());
  app.use(sessionMiddleware());
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    looger.log(`Running On PORT ${PORT}`);
  });
}
bootstrap();
