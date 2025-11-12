import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateDealDto {
  @ApiProperty({ example: 'Website redesign' })
  @IsNotEmpty()
  title: string | undefined;

  @ApiProperty({ example: 'client-uuid' })
  @IsNotEmpty()
  clientId: string | undefined;

  @IsOptional()
  @IsNumber()
  value?: number;
}
