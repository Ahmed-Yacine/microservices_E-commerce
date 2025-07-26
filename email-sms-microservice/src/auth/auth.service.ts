import { Injectable } from '@nestjs/common';
import { ResetPasswordEmailDto } from './dtos/resetPasswordEmail.dto';
import { EmailService } from '../_email/_email.service';

@Injectable()
export class AuthService {
  constructor(private readonly emailService: EmailService) {}

  async sentVerificationCode(resetPasswordEmailDto: ResetPasswordEmailDto) {
    // Send the verification code via email
    await this.emailService.sendPasswordResetCode(
      resetPasswordEmailDto.email,
      resetPasswordEmailDto.verificationCode,
    );
  }
}
