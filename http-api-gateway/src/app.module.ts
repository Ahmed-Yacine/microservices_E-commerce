import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [UsersModule, ProductsModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
