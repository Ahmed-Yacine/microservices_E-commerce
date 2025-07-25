import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}
  public createProduct(id: number) {
    console.log(`Done ${id}`);
  }
}
