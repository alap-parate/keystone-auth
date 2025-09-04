import { 
    IsEmail,
    IsString,
} from 'class-validator'; 
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ type: String, example: 'test@example.com' })
    @IsEmail({}, {message: 'Email cannot be empty'})
    email: string;

    @ApiProperty({ type: String, example: 'password' })
    @IsString({ message: 'Password cannot be empty' })
    password: string;
}
