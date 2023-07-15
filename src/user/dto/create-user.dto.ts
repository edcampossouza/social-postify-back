import { IsEmail, IsString, IsUrl, MinLength } from 'class-validator';
export class CreateUserDto {
  id: number;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsUrl()
  avatar: string;
}
