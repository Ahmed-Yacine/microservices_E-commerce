import { Injectable } from '@nestjs/common';
import { EmailService } from '../_email/_email.service';
import { ResetPasswordEmailDto } from './dtos/resetPasswordEmail.dto';
import { SendVerificationEmailDto } from './dtos/VerificationEmail.dto';

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

  async sendVerificationEmail(
    sendVerificationEmailDto: SendVerificationEmailDto,
  ) {
    await this.emailService.sendEmailVerificationCode(
      sendVerificationEmailDto.email,
      sendVerificationEmailDto.code,
    );
  }
}
