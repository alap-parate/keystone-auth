import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { 
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested
} from "class-validator";
import { Transform, Type, plainToInstance } from "class-transformer";
import { User } from "../entities/user.entity";
import { RoleDto } from "@/role/dto/role.dto";
import { StatusDto } from "./status.dto";

export class SortUserDto {
    @ApiProperty()
    @Type(() => String)
    @IsString()
    orderBy: keyof User;
  
    @ApiProperty()
    @IsString()
    order: string;
}

export class FilterUserDto {
    @ApiPropertyOptional({ type: RoleDto })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RoleDto)
    roles?: RoleDto[] | null;

    @ApiPropertyOptional({ type: StatusDto })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => StatusDto)
    status?: StatusDto[] | null;
}

export class QueryUserDto {
    @ApiPropertyOptional()
    @Transform(({ value }) => value ? Number(value) : 1)
    @IsNumber()
    @IsOptional()
    page?: string;

    @ApiPropertyOptional()
    @Transform(({ value }) => value ? Number(value) : 10)
    @IsNumber()
    @IsOptional()
    limit?: string;

    @ApiPropertyOptional({ type: String })
    @IsOptional()
    @Transform(({ value }) => value ? plainToInstance(FilterUserDto, JSON.parse(value)) : undefined,
    )
    @ValidateNested()
    @Type(() => FilterUserDto)
    filters?: FilterUserDto | null;

    @ApiPropertyOptional({ type: String })
    @IsOptional()
    @Transform(({ value }) => {
      return value ? plainToInstance(SortUserDto, JSON.parse(value)) : undefined;
    })
    @ValidateNested({ each: true })
    @Type(() => SortUserDto)
    sort?: SortUserDto[] | null;
}