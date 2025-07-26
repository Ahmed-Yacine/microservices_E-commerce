import { IsEmail } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;
}
