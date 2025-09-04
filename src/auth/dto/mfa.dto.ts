import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class MfaDto {
  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isMfaEnabled: boolean;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty()
  mfaSecret: string;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @ArrayNotEmpty()
  mfaBackupCodesHash: string[];
}