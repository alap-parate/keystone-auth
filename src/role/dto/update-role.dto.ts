import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiProperty({ example: 'admin' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'the almighty admin' })
  @IsString()
  @IsNotEmpty()
  desc: string;
}
