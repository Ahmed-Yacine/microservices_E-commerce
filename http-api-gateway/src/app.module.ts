import { Module } from '@nestjs/common';
import { NatsClientModule } from './nats-client/nats-client.module';

@Module({
  imports: [NatsClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
