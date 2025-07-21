import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [NatsClientModule],
  controllers: [OrdersController],
})
export class OrdersModule {}
