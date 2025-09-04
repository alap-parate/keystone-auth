import { IsDateString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SessionListResponseDto {

    @ApiProperty({ description: 'The ID of the session' })
    @IsString()
    id: string;

    @ApiProperty({ description: 'User Agent' })
    @IsString()
    userAgent: string;

    @ApiProperty({ description: 'Created At' })
    @IsDateString()
    createdAt: Date;
}
