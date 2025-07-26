import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ResetPasswordEmailDto } from './dtos/resetPasswordEmail.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @EventPattern('sent.verificationCode')
  handelSentVerificationCode(@Payload() Payload: ResetPasswordEmailDto) {
    this.authService.sentVerificationCode(Payload);
  }
}
