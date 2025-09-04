import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SessionListDto {
    @ApiProperty({ description: 'The ID of the user' })
    @IsUUID()
    userId: string;
}
