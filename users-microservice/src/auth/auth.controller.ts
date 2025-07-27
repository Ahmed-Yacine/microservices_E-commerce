import { MessagePattern, Payload } from '@nestjs/microservices';
import { AllRpcExceptionsFilter } from '../common/filters/rpc-exception.filter';
import { ResetPasswordDto } from './dtos/resetPassword.dto';
import { Controller, UseFilters } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { VerifyCodeDto } from './dtos/verificationCode.dto';
import { ChangePasswordDto } from './dtos/changePassword.dto';
import { GoogleUser } from './interfaces/google-user.interface';

@Controller()
@UseFilters(new AllRpcExceptionsFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register')
  async handleRegister(@Payload() Payload: RegisterDto) {
    return await this.authService.register(Payload);
  }

  @MessagePattern('auth.login')
  async handelLogin(@Payload() Payload: LoginDto) {
    return await this.authService.login(Payload);
  }

  @MessagePattern('auth.resetPassword')
  async handelResetPassword(@Payload() Payload: ResetPasswordDto) {
    return await this.authService.resetPassword(Payload);
  }

  @MessagePattern('auth.verifyCode')
  async handelVerifyCode(@Payload() Payload: VerifyCodeDto) {
    return await this.authService.VerifyCode(Payload);
  }

  @MessagePattern('auth.changePassword')
  async handelChangePassword(@Payload() Payload: ChangePasswordDto) {
    return await this.authService.changePassword(Payload);
  }

  @MessagePattern('auth.googleValidate')
  async handleGoogleValidate(@Payload() payload: GoogleUser) {
    return await this.authService.googleValidate(payload);
  }

  // @MessagePattern('auth.verify-email')

  // @MessagePattern('auth.logout')
  // async handleLogout(@Payload() userId: string) {
  //   return await this.authService.logout(userId);
  // }
}
