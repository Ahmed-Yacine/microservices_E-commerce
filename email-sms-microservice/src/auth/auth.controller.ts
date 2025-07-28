import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { ResetPasswordEmailDto } from './dtos/resetPasswordEmail.dto';
import { SendVerificationEmailDto } from './dtos/VerificationEmail.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @EventPattern('sent.verificationCode')
  async handleSentVerificationCode(@Payload() payload: ResetPasswordEmailDto) {
    await this.authService.sentVerificationCode(payload);
  }

  @EventPattern('sendVerificationEmail')
  async handleSendVerificationEmail(
    @Payload() payload: SendVerificationEmailDto,
  ) {
    await this.authService.sendVerificationEmail(payload);
  }
}
