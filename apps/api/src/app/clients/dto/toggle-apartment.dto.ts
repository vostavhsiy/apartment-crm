import { ApiProperty } from "@nestjs/swagger";

export class ToggleApartmentDto {
  @ApiProperty()
  apartmentId!: string;

  @ApiProperty()
  connect?: boolean;
}
