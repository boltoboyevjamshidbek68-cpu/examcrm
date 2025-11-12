import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
