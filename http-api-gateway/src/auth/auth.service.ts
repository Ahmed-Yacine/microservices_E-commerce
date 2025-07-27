import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterDto } from './dtos/register.dto';
import { catchError, firstValueFrom, throwError, timeout } from 'rxjs';
import { LoginDto } from './dtos/login.dto';
import { ResetPasswordDto } from './dtos/resetPassword.dto';
import { VerifyCodeDto } from './dtos/verificationCode.dto';
import { ChangePasswordDto } from './dtos/changePassword.dto';
import { GoogleUser } from './interfaces/google-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  async register(registerDto: RegisterDto) {
    // Send registration request to user microservice
    const user = await firstValueFrom(
      this.natsClient.send('auth.register', registerDto).pipe(
        timeout(5000), // 5 second timeout
        catchError(error => {
          // Re-throw the error so the filter can handle it
          return throwError(() => error);
        }),
      ),
    );

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      user: user,
      access_token,
      expires_in: 86400, // 1 day in seconds
    };
  }

  async login(loginDto: LoginDto) {
    // Send login request to user microservice
    const user = await firstValueFrom(
      this.natsClient.send('auth.login', loginDto).pipe(
        timeout(5000), // 5 second timeout
        catchError(error => {
          return throwError(() => error);
        }),
      ),
    );

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      user: user,
      access_token,
      expires_in: 86400, // 1 day in seconds
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    return await firstValueFrom(
      this.natsClient.send('auth.resetPassword', resetPasswordDto).pipe(
        timeout(5000), // 5 second timeout
        catchError(error => {
          return throwError(() => error);
        }),
      ),
    );
  }

  async verifyCode(verifyCodeDto: VerifyCodeDto) {
    return await firstValueFrom(
      this.natsClient.send('auth.verifyCode', verifyCodeDto).pipe(
        timeout(5000), // 5 second timeout
        catchError(error => {
          return throwError(() => error);
        }),
      ),
    );
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    return await firstValueFrom(
      this.natsClient.send('auth.changePassword', changePasswordDto).pipe(
        timeout(5000), // 5 second timeout
        catchError(error => {
          return throwError(() => error);
        }),
      ),
    );
  }

  async valideUser(userData: GoogleUser) {
    // Send Google user validation request to user microservice
    const user = await firstValueFrom(
      this.natsClient.send('auth.googleValidate', userData).pipe(
        timeout(5000), // 5 second timeout
        catchError(error => {
          return throwError(() => error);
        }),
      ),
    );

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      user: user,
      access_token,
      expires_in: 86400, // 1 day in seconds
    };
  }
}
