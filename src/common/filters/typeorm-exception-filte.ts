import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    InternalServerErrorException
} from "@nestjs/common";
import { QueryFailedError } from "typeorm";

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        
        if((exception as any).code === '23505') {
            return response
                .status(409)
                .json({ message: 'Resource already exists.'});
        } else if((exception as any).code === '23503') {
            return response
                .status(409)
                .json({ message: 'Resource not found.'});
        } 
        
        throw new InternalServerErrorException('Internal server error');
    }
}