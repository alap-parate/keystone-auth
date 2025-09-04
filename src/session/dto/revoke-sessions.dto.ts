import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RevokeSessionsDto {
    @ApiProperty({ description: 'The ID of the user' })
    @IsUUID()
    userId: string;
}
