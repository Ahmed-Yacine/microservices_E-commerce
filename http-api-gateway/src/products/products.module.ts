import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [NatsClientModule],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
