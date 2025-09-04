import {
    // decorators here
    Transform,
    Type,
  } from 'class-transformer';
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  import {
    // decorators here
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
  } from 'class-validator';
  import { RoleDto } from '@/role/dto/role.dto';
  import { lowerCaseTransformer } from '@/utils/transformers/lower-case.transformer';
  import { StatusDto } from './status.dto';
  import { StrongPassword } from '@/common';

  export class CreateUserDto {
    @ApiProperty({ example: 'test@example.com', type: String })
    @Transform(lowerCaseTransformer)
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password', type: String })
    @IsNotEmpty()
    @StrongPassword()
    password: string;

    @ApiProperty({ example: 'John Doe', type: String })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: '+911234567890', type: String })
    @IsString()
    @IsOptional()
    @MaxLength(14)
    phoneNo?: string;

    @ApiProperty({ example: '1', type: [RoleDto] })
    @IsOptional()
    @Type(() => RoleDto)
    roles?: RoleDto | null;

    @ApiPropertyOptional({ example: '1', type: StatusDto })
    @IsOptional()
    @Type(() => StatusDto)
    status?: StatusDto
  }