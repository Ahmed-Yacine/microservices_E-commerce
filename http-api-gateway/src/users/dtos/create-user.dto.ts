import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  name: string;
}
// simple dto to create user for test
