import { OmitType, PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ["password"]),
) {
  @ApiProperty()
  isActive?: boolean;
}
