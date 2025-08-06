import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

import { CreateApartmentDto } from "./create-apartment.dto";

export class UpdateApartmentDto extends PartialType(CreateApartmentDto) {
  @ApiProperty()
  @IsOptional()
  published?: boolean;
}
