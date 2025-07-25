import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { RegisterDto } from './dtos/register.dto';
import { UserRole } from './interfaces/user-role.enum';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

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
}
