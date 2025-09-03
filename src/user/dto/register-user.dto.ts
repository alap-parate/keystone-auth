import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { StrongPassword } from '@/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from '@/utils/transformers/lower-case.transformer';

export class RegisterUserDto {
    @ApiProperty({ example: 'test@test.com', type: String })
    @Transform(lowerCaseTransformer)
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Password@123', type: String })
    @StrongPassword()
    password: string;

    @ApiProperty({ example: '+919876543210', type: String })
    @IsString()
    phoneNo: string;

    @ApiProperty({ example: 'John Doe', type: String })
    @IsNotEmpty()
    @IsString()
    name: string;
}
