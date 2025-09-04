import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RevokeSessionDto {
    @ApiProperty({ description: 'The ID of the session' })
    @IsString()
    id: string;
}
