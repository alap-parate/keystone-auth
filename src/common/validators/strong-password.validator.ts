import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    minLength
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: false })
@Injectable()
export class StrongPasswordValidator implements ValidatorConstraintInterface {
    constructor() {}

    validate(value: string, args: ValidationArguments): boolean {
        const enforceStrong = true;
        const minLength = 8;
        
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