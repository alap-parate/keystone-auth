import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UpdatePermissionDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsUUID()
    permissionIds: string[];
}
