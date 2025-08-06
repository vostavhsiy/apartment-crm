import { ApiProperty } from "@nestjs/swagger";

export class ToggleToCollectionDto {
  @ApiProperty()
  collectionId!: string;

  @ApiProperty()
  connect?: boolean;

  @ApiProperty()
  order?: number;
}
