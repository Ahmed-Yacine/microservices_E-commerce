import { Controller, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDto } from './dtos/register.dto';
import { AllRpcExceptionsFilter } from '../common/filters/rpc-exception.filter';
import { LoginDto } from './dtos/login.dto';

@Controller()
@UseFilters(new AllRpcExceptionsFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register')
  async handleRegister(@Payload() payload: RegisterDto) {
    return await this.authService.register(payload);
  }

  @MessagePattern('auth.login')
  async handelLogin(@Payload() payload: LoginDto) {
    return await this.authService.login(payload);
  }
}
