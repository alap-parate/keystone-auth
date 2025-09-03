import { 
    IsEmail,
} from 'class-validator'; 
import { StrongPassword } from '@/common' 

export class LoginDto {
    @IsEmail()
    email: string;

    @StrongPassword()
    password: string;

}
