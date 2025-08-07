import { ApiProperty } from "@nestjs/swagger";

export class ToggleCollectionDto {
  @ApiProperty()
  collectionId!: string;

  @ApiProperty()
  connect?: boolean;
}
