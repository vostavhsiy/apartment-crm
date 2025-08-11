import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, MaxLength } from "class-validator";

export class CreateNotificationDto {
  @ApiProperty()
  @MaxLength(200)
  title!: string;

  @ApiProperty()
  @MaxLength(200)
  body!: string;

  @ApiProperty()
  @IsOptional()
  link?: string;
}
