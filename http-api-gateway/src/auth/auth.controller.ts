import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dtos/changePassword.dto';
import { EmailDto } from './dtos/email.dto';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { ResetPasswordDto } from './dtos/resetPassword.dto';
import { TokenPayloadDto } from './dtos/token-payload.dto';
import { VerifyCodeDto } from './dtos/verificationCode.dto';
import { GoogleOAuthGuard } from './guards/google-auth.guard';
import { GoogleUser } from './interfaces/google-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-code')
  @HttpCode(HttpStatus.OK)
  async sendVerificationEmail(@Body() emailDto: EmailDto) {
    return this.authService.sendVerificationEmail(emailDto);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<TokenPayloadDto> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<TokenPayloadDto> {
    return this.authService.login(loginDto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post('verify-code')
  @HttpCode(HttpStatus.OK)
  async verifyCode(@Body() verifyCodeDto: VerifyCodeDto) {
    return this.authService.verifyCode(verifyCodeDto);
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }

  @Get('google/sign') // if the email of the user exists in the database, it will be sign-in, otherwise it will create a new user (sign-up)
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {
    return {
      message: 'Redirecting to Google for authentication...',
    };
  }

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Req() req: Request) {
    const user = req.user as GoogleUser; // user will be populated by the GoogleOAuthGuard

    if (!user) {
      throw new Error('No user data received from Google');
    }

    const userData = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      picture: user.picture,
    };

    return this.authService.valideUser(userData);
  }
}
