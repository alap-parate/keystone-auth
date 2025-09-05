import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({ example: 'admin' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'the almighty admin' })
  @IsString()
  @IsNotEmpty()
  desc: string;
}
