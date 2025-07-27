import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { ResetPasswordEmailDto } from './dtos/resetPasswordEmail.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @EventPattern('sent.verificationCode')
  handleSentVerificationCode(@Payload() payload: ResetPasswordEmailDto) {
    this.authService.sentVerificationCode(payload);
  }
}
