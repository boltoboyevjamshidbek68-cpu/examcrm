import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  name: string | undefined;

  @ApiPropertyOptional({ example: 'john@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '+1234567890' })
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: 'Acme Ltd' })
  @IsOptional()
  company?: string;
}
