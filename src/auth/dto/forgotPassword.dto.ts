import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { StrongPassword } from '@/common';

export class ResetPasswordDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  forgotPasswordToken: string;

  @ApiProperty({ type: String })
  @StrongPassword()
  @IsNotEmpty()
  newPassword: string;
}