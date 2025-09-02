import { OmitType } from "@nestjs/mapped-types";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

import { CreateApartmentDto } from "./create-apartment.dto";

export class UpdateApartmentDto extends PartialType(
  OmitType(CreateApartmentDto, ["files"]),
) {
  @ApiProperty()
  @IsOptional()
  published?: boolean;

  @ApiProperty()
  @IsOptional()
  files?: string[];
}
