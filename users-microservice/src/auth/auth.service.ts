import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { ChangePasswordDto } from './dtos/changePassword.dto';
import { EmailDto } from './dtos/email.dto';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { ResetPasswordDto } from './dtos/resetPassword.dto';
import { VerifyCodeDto } from './dtos/verificationCode.dto';
import { GoogleUser } from './interfaces/google-user.interface';
import { UserRole } from './interfaces/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  async sendVerificationEmail(emailDto: EmailDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email: emailDto.email },
      });

      if (!user) {
        throw new RpcException({
          statusCode: 404,
          message: 'User not found',
          error: 'Not Found',
        });
      }

      // Generate a verification code (6-digit number)
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000,
      ).toString();

      // Emit an event to send verification code
      this.natsClient.emit('sendVerificationEmail', {
        email: emailDto.email,
        code: verificationCode,
      });

      // Update the user's verification code
      await this.prismaService.user.update({
        where: { email: emailDto.email },
        data: { verificationCode: verificationCode },
      });
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }

      if (error.name === 'ValidationError') {
        throw new RpcException({
          statusCode: 400,
          message: error.message,
          error: 'Bad Request',
        });
      }

      // Handle Prisma errors
      if (error.code === 'P2021') {
        throw new RpcException({
          statusCode: 500,
          message: 'Database table does not exist. Please run migrations.',
          error: 'Internal Server Error',
        });
      }

      // Generic error
      throw new RpcException({
        statusCode: 500,
        message: 'Failed to send the verification code',
        error: 'Internal Server Error',
      });
    }
  }

  async register(registerDto: RegisterDto) {
    try {
      // Check if user already exists
      const existingUser = await this.prismaService.user.findUnique({
        where: { email: registerDto.email },
      });

      if (existingUser) {
        // ✅ CORRECT WAY: Throw RpcException for microservices
        throw new RpcException({
          statusCode: 409,
          message: 'User with this email already exists',
          error: 'CONFLICT',
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(registerDto.password, 12);

      // Create user
      const user = await this.prismaService.user.create({
        data: {
          email: registerDto.email,
          password: hashedPassword,
          firstName: registerDto.firstName,
          lastName: registerDto.lastName,
          role: registerDto.role || UserRole.CUSTOMER,
        },
      });

      // Return success response
      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      // If it's already an RpcException, re-throw it
      if (error instanceof RpcException) {
        throw error;
      }

      // Handle Prisma errors
      if (error.code === 'P2002') {
        // Prisma unique constraint error
        throw new RpcException({
          statusCode: 409,
          message: 'User with this email already exists',
          error: 'CONFLICT',
        });
      }

      // Handle validation errors
      if (error.name === 'ValidationError') {
        throw new RpcException({
          statusCode: 400,
          message: error.message,
          error: 'Bad Request',
        });
      }

      // Generic error
      throw new RpcException({
        statusCode: 500,
        message: 'Failed to create user',
        error: 'Internal Server Error',
      });
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.prismaService.user.findUnique({
        where: { email: email },
      });

      if (!user || !user.password) {
        throw new RpcException({
          statusCode: 400,
          message: 'Invalid credentials',
          error: 'Bad Request',
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new RpcException({
          statusCode: 400,
          message: 'Invalid credentials',
          error: 'Bad Request',
        });
      }

      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }

      if (error.name === 'ValidationError') {
        throw new RpcException({
          statusCode: 400,
          message: error.message,
          error: 'Bad Request',
        });
      }

      // Generic error
      throw new RpcException({
        statusCode: 500,
        message: 'Failed to create user',
        error: 'Internal Server Error',
      });
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email: resetPasswordDto.email },
      });

      if (!user) {
        throw new RpcException({
          statusCode: 404,
          message: 'User not found',
          error: 'Not Found',
        });
      }

      // Generate a verification code (6-digit number)
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000,
      ).toString();

      // Send verification code via email (fire-and-forget)
      this.natsClient.emit('sent.verificationCode', {
        email: resetPasswordDto.email,
        verificationCode,
      });

      // Update the user's verification code
      await this.prismaService.user.update({
        where: { email: resetPasswordDto.email },
        data: { verificationCode: verificationCode },
      });

      return {
        message: `Verification code sent successfully to your email ${resetPasswordDto.email}`,
      };
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }

      if (error.name === 'ValidationError') {
        throw new RpcException({
          statusCode: 400,
          message: error.message,
          error: 'Bad Request',
        });
      }

      // Handle Prisma errors
      if (error.code === 'P2021') {
        throw new RpcException({
          statusCode: 500,
          message: 'Database table does not exist. Please run migrations.',
          error: 'Internal Server Error',
        });
      }

      // Generic error
      throw new RpcException({
        statusCode: 500,
        message: 'Failed to send the verification code',
        error: 'Internal Server Error',
      });
    }
  }

  async VerifyCode(verifyCodeDto: VerifyCodeDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email: verifyCodeDto.email },
        select: { verificationCode: true },
      });

      if (!user) {
        throw new RpcException({
          statusCode: 404,
          message: 'User not found',
          error: 'Not Found',
        });
      }

      if (user.verificationCode !== verifyCodeDto.code) {
        throw new RpcException({
          statusCode: 400,
          message: 'Invalid code',
          error: 'Bad Request',
        });
      }

      // Clear the verification code after successful verification
      await this.prismaService.user.update({
        where: { email: verifyCodeDto.email },
        data: { verificationCode: null },
      });

      return {
        message: 'Code verified successfully',
      };
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }

      if (error.name === 'ValidationError') {
        throw new RpcException({
          statusCode: 400,
          message: error.message,
          error: 'Bad Request',
        });
      }

      // Generic error
      throw new RpcException({
        statusCode: 500,
        message: 'Failed to verify code',
        error: 'Internal Server Error',
      });
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email: changePasswordDto.email },
      });

      if (!user) {
        throw new RpcException({
          statusCode: 404,
          message: 'User not found',
          error: 'Not Found',
        });
      }

      const password = await bcrypt.hash(changePasswordDto.password, 12);

      const updatedUser = await this.prismaService.user.update({
        where: { email: changePasswordDto.email },
        data: { password },
      });

      if (!updatedUser) {
        throw new RpcException({
          statusCode: 500,
          message: 'Failed to change password',
          error: 'Internal Server Error',
        });
      }

      return {
        message: 'Password changed successfully, please login again',
      };
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }

      if (error.name === 'ValidationError') {
        throw new RpcException({
          statusCode: 400,
          message: error.message,
          error: 'Bad Request',
        });
      }

      // Generic error
      throw new RpcException({
        statusCode: 500,
        message: 'Failed to change password',
        error: 'Internal Server Error',
      });
    }
  }

  async googleValidate(googleUser: GoogleUser) {
    try {
      // Check if user already exists
      let user = await this.prismaService.user.findUnique({
        where: { email: googleUser.email },
      });

      if (!user) {
        // Create new user with Google data
        user = await this.prismaService.user.create({
          data: {
            email: googleUser.email,
            firstName: googleUser.firstName,
            lastName: googleUser.lastName,
            password: '', // Google users don't need a password
            role: UserRole.CUSTOMER, // Default role for Google users
          },
        });
      }

      // Return user data for JWT token generation
      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }

      // Handle Prisma errors
      if (error.code === 'P2002') {
        // Prisma unique constraint error
        throw new RpcException({
          statusCode: 409,
          message: 'User with this email already exists',
          error: 'CONFLICT',
        });
      }

      // Generic error
      throw new RpcException({
        statusCode: 500,
        message: 'Failed to validate Google user',
        error: 'Internal Server Error',
      });
    }
  }
}
