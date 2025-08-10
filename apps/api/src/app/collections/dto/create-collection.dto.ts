import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, MaxLength } from "class-validator";

export class CreateCollectionDto {
  @ApiProperty()
  @MaxLength(200)
  title!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  @IsOptional()
  description?: string;
}
