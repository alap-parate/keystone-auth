import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';

export class StatusRoleDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}