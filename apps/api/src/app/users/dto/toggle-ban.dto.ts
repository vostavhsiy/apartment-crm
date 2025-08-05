import { ApiProperty } from "@nestjs/swagger";

export class ToggleBanDto {
  @ApiProperty()
  isBanned?: boolean;
}
