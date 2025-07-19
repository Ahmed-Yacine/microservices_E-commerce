import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @EventPattern('create-product')
  public createProduct(@Payload() id: number) {
    this.productsService.createProduct(id);
  }
}
