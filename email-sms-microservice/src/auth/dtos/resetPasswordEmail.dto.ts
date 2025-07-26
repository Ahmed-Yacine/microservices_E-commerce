import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class ResetPasswordEmailDto {
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @IsString({ message: 'Verification code must be a string' })
  @Length(6, 6, { message: 'Verification code must be exactly 6 digits' })
  @Matches(/^\d{6}$/, { message: 'Verification code must be exactly 6 digits' })
  verificationCode: string;
}
