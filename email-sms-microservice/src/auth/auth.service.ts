import { Injectable } from '@nestjs/common';
import { ResetPasswordDto } from './dtos/resetPassword.dto';

@Injectable()
export class AuthService {
  sentVerificationCode(resetPasswordDto: ResetPasswordDto) {
    console.log(`sent to ${resetPasswordDto}`);
  }
}
