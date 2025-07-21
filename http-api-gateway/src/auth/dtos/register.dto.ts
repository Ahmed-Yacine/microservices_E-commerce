import { IsEmail, IsString, MinLength } from 'class-validator';
import { UserRole } from '../interfaces/user-role.enum';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  role?: UserRole; // Defaults to CUSTOMER in service
}
