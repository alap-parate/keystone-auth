import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmMailDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  emailConfirmToken: string;
}