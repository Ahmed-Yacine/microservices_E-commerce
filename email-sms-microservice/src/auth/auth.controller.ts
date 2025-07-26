import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ResetPasswordDto } from './dtos/resetPassword.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @EventPattern('sent.verificationCode')
  async handelSentVerificationCode(@Payload() Payload: ResetPasswordDto) {
    await this.authService.sentVerificationCode(Payload);
  }
}
