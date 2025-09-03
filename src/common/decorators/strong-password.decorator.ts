import { 
    registerDecorator,
    ValidationOptions
} from "class-validator";
import { StrongPasswordValidator } from "../validators/strong-password.validator";

export function StrongPassword(validationOptions? : ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: StrongPasswordValidator
        })
    }
}