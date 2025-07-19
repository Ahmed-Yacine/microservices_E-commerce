import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.natsClient.send('createUser', createUserDto);
  }
}
