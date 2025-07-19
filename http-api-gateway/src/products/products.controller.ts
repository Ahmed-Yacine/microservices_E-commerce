import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  @Post()
  public createProduct(@Body() create: any) {
    this.natsClient.emit('create-product', create);
  }
}
