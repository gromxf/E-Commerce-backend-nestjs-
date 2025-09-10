import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginAdminDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}


