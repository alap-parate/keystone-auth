import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { StrongPassword } from '@/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from '@/utils/transformers/lower-case.transformer';

export class RegisterUserDto {

    @ApiProperty({ example: 'John Doe', type: String })
    @IsNotEmpty()
    @IsString()
    @Transform(lowerCaseTransformer)
    name: string;

    @ApiProperty({ example: '+919876543210', type: String })
    @IsString()
    phoneNo: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty()
    @StrongPassword()
    password: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty()
    oldPassword: string;

}
