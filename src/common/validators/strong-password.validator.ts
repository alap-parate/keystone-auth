import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    minLength
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@ValidatorConstraint({ async: false })
@Injectable()
export class StrongPasswordValidator implements ValidatorConstraintInterface {
    constructor(
        private readonly configService: ConfigService
    ) {}

    validate(value: string, args: ValidationArguments): boolean {
        const enforceStrong = this.configService.get<boolean>(
            'auth.passwordPolicy.enforceStrongPassword'
        );
        const minLength = this.configService.get<number>(
            'auth.passwordPolicy.minPasswordLength',
        ) ?? 8;
        
        if(!enforceStrong) return true;

        return (
            value.length >= minLength && 
            /[A-Z]/.test(value) && 
            /[a-z]/.test(value) &&
            /\d/.test(value) && 
            /[!@#$%&*]/.test(value)
        );
    }

    defaultMessage(args?: ValidationArguments): string {
        return `Password must include uppercase, lowercase, number, special character(!@#$%&*) and meet minimum length(${minLength})`;
    }
}