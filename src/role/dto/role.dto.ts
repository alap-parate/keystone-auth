import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class RoleDto {
  @ApiProperty()
  @IsUUID()
  id: string;
}