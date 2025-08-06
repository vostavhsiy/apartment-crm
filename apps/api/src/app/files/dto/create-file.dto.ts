import { ApiProperty } from "@nestjs/swagger";

export class CreateFileDto {
  @ApiProperty()
  file!: Express.Multer.File;

  @ApiProperty()
  order?: number;

  @ApiProperty()
  apartmentId!: string;
}
