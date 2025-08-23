import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class CreateFileDto {
  @ApiProperty()
  file!: Express.Multer.File | string;

  @ApiProperty()
  @IsOptional()
  order?: number;

  @ApiProperty()
  apartmentId!: string;
}
